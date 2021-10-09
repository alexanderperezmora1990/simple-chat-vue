# simple-chat-vue

Develop a simple chat between two clients.
• Quasar framework and VueJS are required.
• Use only UI component that Quasar framework provides.
• Use deepstream to establish a communication channel between two clients.

## Install the dependencies of project
```bash
npm i
```

## Install deepstream

Before run the app install deepstream https://deepstream.io/ and run this comand:

```bash
./deepstream start
```
deepstream should run on the port localhost:6020

### Start the app in development mode
```bash
quasar dev
```

### Ussage

The app has two forms, login and registration  that work with firebase simple autentication, you can register your email and password or use this:

```bash
 {
     email: ale@simple.com
     password: 123456
 },
 {
     email: ale2@simple.com
     password: 123456
 }
```
It is important to run the application on a different port for each client