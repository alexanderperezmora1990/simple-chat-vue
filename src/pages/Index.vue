<template>
  <q-layout view="lHh Lpr lFf">
 
    <q-page-container>

      <AccessView v-if="!isAuthenticated"/>
      <div class="row" style="height: calc(100vh - 50px);" v-else>
        <div class="col-4 bg-primary center">
          <div class="column">
            <div class="col">
              <q-icon name="account_circle" style="color: #ffff; font-size: 16em;"/>
            </div>
            <div class="col text-center">
               <h5 class="q-my-md" style="color: white;">{{user.email}}</h5>
            </div>
            <div class="col text-center">
               <q-btn color="negative" v-if="isAuthenticated" @click="logOut">LogOut</q-btn>
            </div>
          </div>
        </div>
        <div class="col-8">
            <ChatView :uidSelected="uidSelected" :client="client"/>
        </div>
      </div>
   
    </q-page-container>
  </q-layout>
</template>

<script>
import AccessView from '../components/AccessView.vue'
import ChatView from '../components/ChatView.vue'
import { auth, db } from '../boot/chat';
import { useAuth } from '@vueuse/firebase/useAuth'
import { DeepstreamClient } from '@deepstream/client';


const { user, isAuthenticated } = useAuth(auth);

export default {
  data() {
    return {
      user,
      isAuthenticated,
      uidSelected: '',
      client: null
    }
  },
  created() {
    this.client = new DeepstreamClient('localhost:6020')
    this.client.login();
  },
  components: {
    AccessView,
    ChatView
  },
  methods: {
    async logOut(){ 
      await db.collection('users').doc(this.user.uid).update({
        access: false,
      })
      await auth.signOut();
    }
  }


}
</script>

<style scoped>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>