'use strict';

import Board from "./components/board.js";
import Thread from "./components/thread.js";
import PageButton from "./components/page_button.js";

const content = Vue.createApp({
    data() {
        return {
            // The list containing the page' threads
            threadList: [],
        }
    },

    // Randomize posts
    mounted() {
        for(let i = 0; i < Math.floor(Math.random() * 60); i++) {
            this.threadList.push(createThread(Math.random() * 100, randomText(50), randomText(20), "Anonymous", getCurrentTime(), `/images/user/${Math.ceil(Math.random() * 10)}.png`));
        };
    }
});

// Vue component making up a thread
content.component("thread", {
    data() {
        return {
            collapsed: false
        }
    },
    props: ["title", "username", "content", "img_src", "date", "img_filename"],
    template: `<div class="thread">
                <div class="thread-file-info">
                  <button v-on:click="this.collapsed = !this.collapsed">Hide/Unhide</button>
                  <p class="thread-file-name" v-if="img_src !== ''">File: {{ img_filename }}</p>
                </div>
                <div class="thread-content">
                  <img v-bind:src="img_src" class="thread-img" v-if="!this.collapsed"/>
                  <div class="thread-content-container">
                    <span class="thread-title">
                      <p class="title-text">{{ title }}</p>
                      <p class="title-username">{{ username }}</p>
                      <p class="title-date">{{ date }}</p>
                    </span>
                    <p class="thread-text-content" v-if="!this.collapsed">{{ content }}</p>
                  </div>
                </div>
              </div>
              <hr>`
});

// YOU HAVE TO MOUNT IT AND SAVE THE REFERENCE TO IT TOO
const contentBinding = content.mount(".content");

// Bind to the board header
const headerBinding = Vue.createApp({
    // The bindings for the header
    data() {
        return {
            header_board_name : "ViChan",

            header_img_src : "",

            header_start_thread_text : "Start a New Thread",

            header_ad_img_src : "",

            // Thread options
            isNewThreadButtonClicked: false,
            new_thread_options_name_title : "Name",
            new_thread_options_name_input_placeholder: "Anonymous",
            new_thread_options_subject_title: "Subject",
            new_thread_options_content_title: "Comment",
            new_thread_options_post_button_text: "Post",
            new_thread_options_close_button_text: "Close",
            // v-model are 2-way bindings
            new_thread_name_input_value: "Anonymous",
            new_thread_title_input_value: "",
            new_thread_content_input_value: "",
            new_thread_file_input_value: "", // Stores the value of the filepicker
        }
    },

    // The entry point
    mounted() {
        const list = Board.getBoardList();

        // Randomize the board name
        const boardNum = Math.floor(Math.random() * list.length);
        this.header_board_name = `/${list[boardNum].name}/ - ${list[boardNum].topic}`;

        // Randomize the header board image
        this.header_img_src = `/images/header/boards/${list[boardNum].name}/header.jpg`;

        // Randomize the header ads image
        this.header_ad_img_src = `/images/header/ads/${list[boardNum].name}/header.jpg`;
    },

    methods: {
        showNewThreadOptions() {
            this.isNewThreadButtonClicked = !this.isNewThreadButtonClicked;
        },

        // Because we can't simply use v-model on the filepicker, a v-on:change hack is needed to store the uploaded file
        storeFilepickerValue(event) {
            this.new_thread_file_input_value = event.target.files.length > 0 ? event.target.files[0] : null;
        },

        postNewThread() {
            if (this.new_thread_title_input_value === "" || this.new_thread_content_input_value === "") {
                console.error("No input received. Cannot create new thread");
                return;
            }

            contentBinding.threadList.push(createThread(0, this.new_thread_title_input_value, this.new_thread_content_input_value, this.new_thread_name_input_value, getCurrentTime(), this.new_thread_file_input_value ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" : ""));

            // Hide the thread options
            this.isNewThreadButtonClicked = false;

            // Reset the thread options
            this.new_thread_name_input_value = "Anonymous";
            this.new_thread_title_input_value = "";
            this.new_thread_content_input_value = "";
            this.new_thread_file_input_value = null;
        }
    }
}).mount(".header");


const utilitiesBinding = Vue.createApp({
    data() {
        return {
            search_box_placeholder_text : "Search OPs",
            catalog_button_text : "Catalog",
            archive_button_text : "Archive"
        }
    }
}).mount(".utilities");


const footer = Vue.createApp({
    data() {
        return {
            pageList: []
        };
    },

    mounted() {
        // Add page buttons based on total thread count
        const pageCount = Math.ceil(contentBinding.threadList.length / 2);

        const baseUrl = "http://localhost:8000/#";

        for (let i = 1; i <= pageCount; i++) {
            this.pageList.push(new PageButton(`${baseUrl}${i}`, i));
        }
    }
});

footer.component("page-button", {
    props: ["link", "count"],
    template: `<p class="button-text">[<a v-bind:href="link" class="button-text-content">{{ count }}</a>]</p>`
});

const footerBinding = footer.mount(".footer");


// Create a thread object
function createThread(id, title, content, username, date, img_src) {
    const newThread = new Thread();
    newThread.id = title; // GUID soon
    newThread.title = title;
    newThread.content = content;
    newThread.username = username;
    newThread.date = date;
    newThread.collapsed = false;

    // Set the image for the thread
    newThread.img_src = img_src ?? "";

    // Set the filename text
    if (newThread.img_src.length > 0) {
        let temp = newThread.img_src.split("/");
        newThread.img_filename = temp[temp.length - 1];
    }

    // Read image with FileReader
    // if (this.new_thread_file_input_value) {
    //     console.log(this.new_thread_file_input_value);
    //     let reader = new FileReader();

    //     // reader.addEventListener("load", function() {
    //     //     // Convert image file to base64 string
    //     //     newThread.img_src = reader.result;
    //     // }, false);

    //     newThread.img_src = reader.readAsDataURL(this.new_thread_file_input_value);
    // }

    return newThread;
}


function randomText(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function getCurrentTime() {
    return Date.now();
}
