<template>
       
       <div id="ver">
           <div id="container"   class="q-pa-md row justify-center q-pt-xl q-px-xl" style="max-height: calc(100vh - 50px); overflow: auto;" >
                <div style="width: 100%; max-width: 90vw">
                    <q-chat-message
                            v-for="chat in chats"
                            :key="chat.id"
                            :name="chat.user"
                            :text="[chat.message]"
                            :sent="chat.uid === user.uid"
                        />
                </div>
          

            <q-footer>
                <q-form @submit.prevent="sendMessage">
                        <q-toolbar class="bg-primary text-white row q-px-xl">
                            <q-input rounded outlined dense class="col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
                            <q-btn round flat icon="send" type="submit" />
                        </q-toolbar>
                </q-form>
            </q-footer>
           </div>
       </div>
        
</template>

<script>
import { db, auth, time } from '../boot/chat';
import { useAuth } from '@vueuse/firebase/useAuth'
const { user } = useAuth(auth);

export default {
    props:['client'],
    data() {
        return {
            message: '',
            chats: [],
            user: user,
            RefChat: null
        }
    },
    created() {
        console.log(this.chats);
        this.chatView = this.client.record.getRecord('test/johndoe');  
        this.chatView.subscribe(values => {
           if (values.chat) {
               this.chats = values.chat;
               var container = this.$el.querySelector("#container");
               container.scrollTop = container.scrollHeight;
           } 
        })
    }, 
    methods: {
        async sendMessage() {
            if (this.message.length > 0) {
                try {
                    const newMessage = {
                        user: user.value.email,
                        message: this.message,
                        uid: user.value.uid,
                        date: time()
                    } 
                    this.chats.push(newMessage);
                    this.chatView.set('chat', this.chats);
                    this.message = '';
                } catch (error) {
                    console.log(error);
                }
                
            }
        },
    }
}
</script>

<style>

</style>