<template>
  <div class="q-px-xl q-py-xl">
    <h5>{{access ? 'Login':'Register'}} Form</h5>
    <q-form class="q-gutter-md column" @submit.prevent="processForm">
        <div class="col">
            <q-input label="email" v-model="email"/>
            <span class="alert q-mt-md" v-if="validEmail">
                invalid email*
            </span>
            <span class="alert q-mt-md" v-if="requireds[0]">
                required*
            </span>
            <q-input label="password" v-model="password"/>
            <span class="alert q-mt-md" v-if="requireds[1]">
                required*
            </span>
        </div>
        <div class="col">
            <q-btn color="primary" :label="access ? 'Login':'Register'" type="submit"/>
            <q-btn class="q-ml-sm" color="primary" outline v-if="!access" @click="access = true">Do you have account?</q-btn>
            <q-btn class="q-ml-sm" color="negative" outline v-else @click="access = false">Don't have account?</q-btn>
        </div>
    </q-form>
    <h6 class="alert q-mt-md" v-if="errorFire">
        {{errorFire}}
    </h6>
  </div>

</template>

<script>
import { auth, db } from '../boot/chat';

export default {
    data() {
        return {
            email: '',
            password: '',
            access: true,
            validEmail: false,
            errorFire: null,
            requireds: [false, false]
        }
    }, 
    methods: {
       async processForm() {
           this.errorFire = null;
            if (this.email.length === 0 || !this.password.length === 0) {
                if (this.email.length === 0) this.requireds[0] = true;
                if (this.password.length === 0) this.requireds[1] = true; 
                return
            }
            this.requireds = [false, false];
            try {
                if (!this.access) {
                    const userCredential = await auth.createUserWithEmailAndPassword(
                        this.email,
                        this.password
                    );
                    const userDB = userCredential.user;
                    await db.collection("users").doc(userDB.uid).set({
                        email: userDB.email,
                        uid: userDB.uid,
                        access: true,
                    });
                } else {
                    const userCredential = await auth.signInWithEmailAndPassword(
                        this.email,
                        this.password
                    );
                    const userDB = userCredential.user;
                    await db.collection("users").doc(userDB.uid).update({
                        access: true,
                    });
                }
                this.email = '';
                this.password = '';
            } catch (error) {
                this.errorFire = error.message;
            }

            
        }
    },
    watch: {
        email(value) {
             var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             if (value.length === 0) {
                 this.requireds[0] = true;
                 this.validEmail = false;
                 return
             } 
             if (re.test(value)) {
                 this.validEmail = false;
             } else {
                 this.validEmail = true;
             }
             this.requireds[0] = false;
        },
        password(value) {
             if (value.length === 0) {
                 this.requireds[1] = true;
                 return
             } 
        }
    }
}
</script>

<style scoped>
    .alert {
        color: var(--q-negative) !important;
    }
</style>