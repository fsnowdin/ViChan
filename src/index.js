const content = Vue.createApp( {
    data() {
        return {
            // The list containing the page' threads
            threadList: [],
        }
    },

    // Randomize posts
    mounted() {
        for(i = 0; i < Math.floor(Math.random() * 36); i++)
        {
            this.threadList.push(new Thread(Math.random() * 100, randomText(50), "Anonymous", randomText(20), `../images/user/${Math.ceil(Math.random() * 10)}.png`, Date.now()));
        };
    }
});

// Vue component making up a thread
content.component("thread", {
    props: ["title", "username", "content", "img_src", "date"],
    template: `<div class="thread">
                <img v-bind:src="img_src" class="thread-img" />
                <div class="thread-content-container">
                  <span class="thread-title">
                    <p class="title-text">{{ title }}</p>
                    <p class="title-username">{{ username }}</p>
                    <p class="title-date">{{ date }}</p>
                  </span>
                  <p class="thread-content">{{ content }}</p>
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
            // v-model are 2-way bindings
            new_thread_name_input_value: "Anonymous",
            new_thread_title_input_value: "",
            new_thread_content_input_value: "",
        }
    },

    // The entry point
    mounted() {
        const list = Board.getBoardList();

        // Randomize the board name
        const boardNum = Math.floor(Math.random() * list.length);
        this.header_board_name = `/${list[boardNum].name}/ - ${list[boardNum].topic}`;

        // Randomize the header board image
        this.header_img_src = `../images/header/boards/${list[boardNum].name}/header.jpg`;

        // Randomize the header ads image
        this.header_ad_img_src = `../images/header/ads/${list[boardNum].name}/header.jpg`;
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

            const newThread = new Thread();
            newThread.id = 0; // GUID soon
            newThread.title = this.new_thread_title_input_value;
            newThread.content = this.new_thread_content_input_value;
            newThread.username = this.new_thread_name_input_value;

            // Add to the threadList
            contentBinding.threadList.push(newThread);

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


function randomText(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
