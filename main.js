import 'regenerator-runtime/runtime'


const API_KEY='gbWOcrpqjX0v4Jravw_iWLsGcVaeu2sIkfP_MRJrGNM'
const QUERY = `https://api.unsplash.com/photos/random?client_id=${API_KEY}`


const FirstApp = {
    data() {
        return {
            name: 'Ivan Sprut',
            age: 24,
            avatar: 'https://homecouture.com.ua/img/tovars/118/big/45785/%D0%9A%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%B0_%D0%BD%D0%B0_%D1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%B5_Cool_Man_150_%D1%85_120_%D1%81%D0%BC.(Kare_Design_52578)_75936.jpg',
            number: Math.round(Math.random()),
            loading: false
        }
    },
    methods: {
        async getImage() {
            try {
                this.loading = true;
                const response = await fetch(QUERY);
                const photo = await response.json();
                
                this.avatar =  photo.urls.regular;
                this.loading = false;
            } catch(e) {
                console.log(e);
            }
        }
    }
}

Vue.createApp(FirstApp).mount('#app')