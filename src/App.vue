<template>
<div>
  <div class="loginModal">
    <h3>Connetti Metamask e accedi con Twitter</h3>
  </div>
  <main class="main">
    <Header
      v-on:connect="connect"
      v-on:disconnect="disconnect"
      :account="account"
      :balance="balance"
      :ticker="selected_ticker"
      :user ="user"
      :twitter="twitter"
    ></Header>
    <router-view />
    <Footer></Footer>
  </main>
</div>

</template>
<style lang="css">
html,
body {
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
}

.loginModal {position: absolute;display:none;left: 50%;top: 50%; background: #1e1d24; color:rgb(192, 197, 206);z-index:999;transform: translate(-50%,-50%) scale(0); border-radius: 13px; box-shadow:1px 4px 25px rgba(0,0,0,.35); padding:50px; animation: fadeIn 2.4s ease-in-out infinite; animation-delay: .1s;}
@media(max-width:767px) {
  .loginModal{width:300px;}
}
@keyframes fadeIn {
  0% {transform: translate(-50%,-50%) scale(0);}
  10% {transform: translate(-50%,-50%) scale(1);}
  90% {transform: translate(-50%,-50%) scale(1);}
  100% {transform: translate(-50%,-50%) scale(0);}
}
</style>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Web3 from "web3";

import axios from 'axios'

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      account: "",
      web3: "",
      twitter: false,
      balance: 0,
      selected_network: process.env.VUE_APP_CHAIN_ID,
      selected_ticker: process.env.VUE_APP_TICKER,
      user: {}
    };
  },
  methods: {
    async connect() {
      const app = this;
      if (window.ethereum) {
        // Check if network is desired one
        const network = await app.web3.eth.net.getId();
        if (network === parseInt(app.selected_network)) {
          // Request accounts
          await window.ethereum.send("eth_requestAccounts");
          // Read accounts
          const accounts = await app.web3.eth.getAccounts();
          if (accounts[0] !== undefined) {
            app.account = accounts[0];
            // Take balance
            const balance = await app.web3.eth.getBalance(accounts[0]);
            app.balance = parseFloat(
              app.web3.utils.fromWei(balance, "ether")
            ).toFixed(10);
            localStorage.setItem("connected", app.account);
          }
        } else {
          // If not prompt for network change
          if(parseInt(app.selected_network) !== 5777){
            app.switchNetwork();
          }else{
            alert('Switch to Ganache Network!')
          }
        }
      } else {
        alert("Please install Metamask");
      }
    },
    async disconnect() {
      const app = this;
      localStorage.removeItem("connected");
      localStorage.removeItem("oauth_token")
      app.account = "";
      app.balance = 0;
      location.reload();
    },
    async switchNetwork() {
      const app = this;
      if(process.env.VUE_APP_NETWORK === 'mumbai') {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x89",
              chainName: "Polygon",
              rpcUrls: ["https://rpc-mainnet.matic.network"],
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://polygonscan.com/"],
            },
          ],
        });
      }
      app.connect();
    },
  },
  async mounted() {
    const app = this;
    if (window.ethereum) {
      app.web3 = await new Web3(window.ethereum);
      const accounts = await app.web3.eth.getAccounts();
      if (accounts.length > 0) {
        if (accounts[0] === localStorage.getItem("connected")) {
          const balance = await app.web3.eth.getBalance(accounts[0]);
          app.account = accounts[0];
          app.balance = parseFloat(
            app.web3.utils.fromWei(balance, "ether")
          ).toFixed(10);
        }
      }
    }
    //Verify profile
    if(localStorage.getItem('oauth_token') !== null) {
      let res = await axios.post('/twitter/validate', {
        oauth_token: localStorage.getItem('oauth_token'),
        address: localStorage.getItem('connected')
        })
      if(res.data.error == true) {
        localStorage.removeItem('oauth_token')
        localStorage.removeItem('verified')
        this.$router.push({name: 'Home'})
        this.twitter = false
      }
      else {
        this.user = res.data.user
        if(this.user.birth_date === null || this.user.name === null || this.user.surname === null || this.user.email === null || this.user.description === null || this.user.description === null || this.user.codice_fiscale === null || this.user.linkedin_profile_url === null) {
          localStorage.setItem('verified', "false")
        }
        else {
          localStorage.setItem('verified', "true")
        }
        this.twitter = true
      }
    }

  },
};
</script>
