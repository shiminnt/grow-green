<template>
    <div class="bg">
        <base-page></base-page>
        <div class="sidenav">
            <router-link to="/account/profile">Profile</router-link>
            <router-link class="current" to="/account/edit"
                >Edit Profile</router-link
            >
            <router-link to="/account/changepassword"
                >Change Password</router-link
            >
        </div>
        <div class="content">
            <h1>Edit Profile</h1>
            <div class="profilepic">
                <div class="profilepic-input">
                    <p>Change your profile picture</p>
                    <input
                        type="file"
                        @change="previewImage"
                        accept="image/*"
                    /><br />
                    <br />
                    <button @click="onUpload">Upload</button>
                    <p>
                        Progress:
                        <progress
                            id="progress"
                            v-bind:value="uploadValue"
                            max="100"
                        ></progress>
                        {{ uploadValue.toFixed() + "%" }}
                    </p>
                </div>
                <div v-if="imageData != null" class="image-cropper">
                    <img class="preview" v-bind:src="picture" alt="Avatar" />
                    <br />
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import BasePage from "./Header.vue";
import Footer from "./Footer.vue";
import { mapGetters } from "vuex";
import { auth, storage, database } from "../firebase.js";

export default {
    components: { BasePage, Footer },
    data: function() {
        return {
            imageData: null,
            picture: null,
            uploadValue: 0,
        };
    },
    computed: {
        ...mapGetters(["userData"]),
    },
    methods: {
        previewImage(event) {
            this.uploadValue = 0;
            this.picture = URL.createObjectURL(event.target.files[0]);
            this.imageData = event.target.files[0];
        },

        onUpload() {
            this.picture = null;
            var user = auth.currentUser;
            var uid = user.uid;
            database
                .collection("users")
                .doc(uid)
                .set(this.userData)
                .then(() => {
                    const storageRef = storage
                        .ref(
                            user + "/profilePicture/" + `${this.imageData.name}`
                        )
                        .put(this.imageData);
                    storageRef.on(
                        `state_changed`,
                        (snapshot) => {
                            this.uploadValue =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                        },
                        (error) => {
                            console.log(error.message);
                        },
                        () => {
                            this.uploadValue = 100;
                            storageRef.snapshot.ref
                                .getDownloadURL()
                                .then((url) => {
                                    this.picture = url;
                                    user.updateProfile({
                                        photoURL: url,
                                    })
                                        .then(() => {
                                            alert(
                                                "Your profile picture has been updated!"
                                            );
                                            this.$router.go();
                                        })
                                        .catch(function(error) {
                                            alert(error);
                                        });
                                });
                        }
                    );
                });
        },

        loadUserData: function() {
            const user = auth.currentUser;
            if (user) {
                this.photoUrl = user.photoURL;
                const uid = user.uid;
                database
                    .collection("users")
                    .doc(uid)
                    .get()
                    .then((doc) => {
                        this.initialData = doc.data();
                        if (this.userData) {
                            if (
                                this.initialData.displayName ==
                                this.userData.displayName
                            ) {
                                this.$store.dispatch(
                                    "updateUserData",
                                    this.userData
                                );
                            } else {
                                this.$store.dispatch(
                                    "updateUserData",
                                    this.initialData
                                );
                            }
                        } else {
                            this.$store.dispatch(
                                "updateUserData",
                                this.initialData
                            );
                        }
                    });
            }
        },
    },
    created() {
        this.loadUserData();
    },
};
</script>

<style scoped>
.bg {
    background-color: ivory;
    overflow-y: scroll;
}
.sidenav {
    margin: 0;
    padding: 0;
    top: 150px;
    width: 250px;
    left: 250px;
    background-color: rgb(243, 233, 219);
    position: fixed;
    height: 100%;
    overflow: auto;
}
.sidenav a {
    text-decoration: none;
    font-size: 20px;
    display: block;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    color: black;
    padding: 16px;
}
.sidenav a:hover {
    color: grey;
}
.sidenav a.current {
    background-color: #eadece;
    color: black;
    text-decoration: none;
    font-size: 20px;
    display: block;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.content {
    position: fixed;
    width: 1000px;
    left: 500px;
    top: 150px;
    padding: 8px 0;
    background: #eadece;
    padding-left: 20px;
    height: 100%;
    overflow: auto;
}
.image-cropper {
    width: 200px;
    height: 200px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
}
img.preview {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: auto;
    margin-left: 0;
}
.profilepic {
    border-bottom: 2px solid black;
    height: 220px;
    margin-right: 20px;
}
.profilepic div {
    float: left;
}
.profilepic-input {
    padding-right: 20px;
}
</style>
