<template>
    <div class="bg">
        <base-page></base-page>
        <div class="container">
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
                        <label for="file-upload" class="fileupload">
                            Choose File
                        </label>
                        <span v-if="this.noImage">No File Chosen</span>
                        <input
                            id="file-upload"
                            type="file"
                            @change="previewImage"
                            accept="image/*"
                            style="display: none"
                        /><br />
                        <br />
                        <button v-if="this.noImage" class="uploadButton">
                            Upload
                        </button>
                        <button v-if="!this.noImage" class="uploadSuccess" @click="onUpload">
                            Upload
                        </button>
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
                        <img
                            class="preview"
                            v-bind:src="picture"
                            alt="Avatar"
                        />
                        <br />
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import BasePage from "./Header.vue";
import Footer from "./Footer.vue";
import { database, auth, storage } from "../firebase.js";
export default {
    components: { BasePage, Footer },
    data: function() {
        return {
            imageData: null,
            picture: null,
            uploadValue: 0,
            noImage: true,
            userData: {},
        };
    },
    methods: {
        previewImage(event) {
            this.uploadValue = 0;
            this.picture = URL.createObjectURL(event.target.files[0]);
            this.imageData = event.target.files[0];
            this.noImage = !this.noImage;
        },
        onUpload() {
            this.picture = null;
            var user = auth.currentUser;
            const storageRef = storage
                .ref(user + "/profilePicture/" + `${this.imageData.name}`)
                .put(this.imageData);
            storageRef.on(
                `state_changed`,
                (snapshot) => {
                    this.uploadValue =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.log(error.message);
                },
                () => {
                    this.uploadValue = 100;
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        this.picture = url;
                        this.userData.photoURL = this.picture;
                        const uid = user.uid;
                        database
                            .collection("users")
                            .doc(uid)
                            .set(this.userData)
                            .then(() => {
                                console.log("Document successfully written!");
                            });
                        user.updateProfile({
                            photoURL: url,
                        })
                            .then(() => {
                                alert("Your profile picture has been updated!");
                                this.$router.go();
                            })
                            .catch(function(error) {
                                alert(error);
                            });
                    });
                }
            );
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
.container {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    width: 100%;
    justify-content: center;
}
.sidenav {
    width: 15%;
    background-color: rgb(243, 233, 219);
    float: left;
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
    text-align: left;
    width: 60%;
    padding: 8px 0px 8px 20px;
    background: #eadece;
    height: 1000px;
    float: left;
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
.uploadButton {
    background-color: grey;
    border: none;
    color: white;
    font-family: unset;
    font-size: 15px;
    padding: 5px 25px;
    text-align: center;
    margin: 10px;
    border-radius: 30px;
    font-weight: 600;
}
.uploadSuccess {
    background-color: black;
    border: none;
    color: white;
    font-family: unset;
    font-size: 15px;
    padding: 5px 25px;
    text-align: center;
    margin: 10px;
    border-radius: 30px;
    font-weight: 600;
}
.fileupload {
    background-color: black;
    border: none;
    color: white;
    font-family: unset;
    font-size: 15px;
    padding: 5px 25px;
    text-align: center;
    margin: 10px;
    border-radius: 30px;
    font-weight: 600;
    letter-spacing: 0px;
}
</style>
