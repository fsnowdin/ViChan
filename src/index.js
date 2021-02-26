const App = Vue.createApp({}); // Create Vue instance with default config

const content = Vue.createApp( {
    data() {
        return {
            // The list containing the page' threads
            threadList: [
                { id : 0, title : "hahahihi", username : "Anonymous", content : "discuss"},
            ] ,
        }
    },

    // Randomize posts
    mounted() {
        for(i = 0; i < Math.random() * 20; i++)
        {
            this.threadList.push(new Thread(Math.random() * 100, "ntuyafntuyaf", "Anonymous", "tnufatnuyanftuynf"));
        };
    }
});

content.component("thread", {
    props: ["title", "username", "content"],
    template: `<div class="thread">
                <span class="thread-title">

                  <p class="title-text">{{ title }}</p>
                  <p class="title-username">{{ username }}</p>
                </span>
                <p class="thread-content">{{ content }}</p>
              </div>`
});

// YOU HAVE TO MOUNT IT AND SAVE THE REFERENCE TO IT TOO
const contentBinding = content.mount(".content");

// COMPONENTS //

// Thread Component

// content.component("thread_title",{
//     props: ["title", "username"],
//     template: `<span class="thread_title">
//                 <p id="title_text">{{ title }}</p>
//                 <p class="title_username">{{ username }}</p>
//               </span>`
// });

// INITIALIZE THE BINDINGS //

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
            // v-model are 2-way bindings
            new_thread_name_input_value: "Anonymous",
            new_thread_title_input_value: "",
            new_thread_content_input_value: "",
        }
    },

    // The entry point
    mounted() {
        // Randomize the board name
        this.header_board_name = `/${BoardNames[Math.floor(Math.random() * BoardNames.length)]}/`;

        // Randomize the header board image
        this.header_img_src = `../images/header/boards/${BoardNames[Math.floor(Math.random() * BoardNames.length)]}/header.jpg`;

        // Randomize the header ads image
        this.header_ad_img_src = `../images/header/ads/${BoardNames[Math.floor(Math.random() * BoardNames.length)]}/header.jpg`;
    },

    methods: {
        showNewThreadOptions() {
            console.log("showing new thread options");
            this.isNewThreadButtonClicked = !this.isNewThreadButtonClicked;
        },

        postNewThread() {
            if (this.new_thread_title_input_value === "" || this.new_thread_content_input_value === "") {
                console.error("No input received. Cannot create new thread");
                return;
            }

            console.log(`post new thread by ${this.new_thread_name_input_value} with subject ${this.new_thread_title_input_value} and content: ${this.new_thread_content_input_value}`);

            // Add to the threadList
            contentBinding.threadList.push({ id : 0, title: this.new_thread_title_input_value, username : this.new_thread_name_input_value, content : this.new_thread_content_input_value });

            // Hide the thread options
            this.isNewThreadButtonClicked = false;

            // Reset the thread options
            this.new_thread_name_input_value = "Anonymous";
            this.new_thread_title_input_value = "";
            this.new_thread_content_input_value = "";
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
