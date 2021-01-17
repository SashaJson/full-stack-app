import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
import request from '../helpers/request'

Vue.component('loader', {
    template: `
<div style="display: flex; justify-content: center; align-items: center">
    <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</div>
    `
});

new Vue({

    el: "#app",

    data() {
        return {
            loading: false,
            form: {
                name: "",
                value: ""
            },
            contacts: []
        }
    },

    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim();
        }
    },

    methods: {
        async createContact() {
            try {

                const {...contact} = this.form;

                const newContact = await request(
                    'http://localhost:3000/api/contacts',
                    'POST',
                    contact
                );

                this.contacts.push(newContact);
                this.form.name = this.form.value = '';

            } catch (error) {
                console.log(error);
            }
        },

        async markContact(id) {
            try {

                const contact = this.contacts.find(c => c.id === id);

                const updated = await request(
                    `http://localhost:3000/api/contacts/${id}`,
                    'PUT', {
                        ...contact,
                        marked: true
                    });

                contact.marked = updated.marked;

            } catch (error) {
                console.log(error);
            }
        },

        async removeContact(id) {
            try {

                await request(
                    `http://localhost:3000/api/contacts/${id}`,
                    'DELETE'
                );

                this.contacts = this.contacts.filter(c => c.id !== id);

            } catch (error) {
                console.log(error);
            }
        }
    },

    async mounted() {
        try {

            this.loading = true;
            this.contacts = await request('http://localhost:3000/api/contacts');
            this.loading = false;

        } catch (error) {
            console.log(error);
        }
    }

});