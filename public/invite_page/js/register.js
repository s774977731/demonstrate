new Vue({
    el:'.register',
    data:{
        second:60,
        text:'获取验证码',
        isRegister:false,
        phone:'',
        code:'',
        toastText:'请输入验证码',
        isToasting:false
    },
    mounted:function() {

    },
    methods:{
      //获取验证码
      getCode() {
        if(!this.isPhoneNumber(this.phone)) {
            this.showToast('请输入正确的手机号');
            return false;
        }
        if(this.second != 60) return false;
        var _this = this;
        this.text = '重新获取'+ this.second +'s';
        this.cutDown();
        $.ajax({
            url:'/sendVerifyCode',
            method:'post',
            headers:{
                'x-params-fp':this.header_md5_aes_base64(this.phone)
            },
            data:{mobile:this.params_aes(this.phone)},
            success:function(res) {
                if(res.code == 200) {
                    _this.showToast('验证码发送成功');
                }
            }
        });
      },
      //倒计时
      cutDown() {
        let second = this.second;
        let timeout = setTimeout(() => {
          if(second <= 0) {
            clearTimeout(timeout);
            this.text = '获取验证码';
            this.second = 60;
          }else {
            second -= 1;
            this.text = '重新获取' + second +'s';
            this.second = second;
            this.cutDown();
          }
        },1000)
      },
      //进入用户协议
      enterUserAgreement() {
        window.location.href = './agreement.html'
      },
      //注册
      handleRegister() {
          var _this = this;
          if(!this.phone) {
              this.showToast('请输入手机号');
              return false;
          }
          if(!this.code) {
              this.showToast('请输入验证码');
              return false;
          }
          $.ajax({
              url:'/register',
              method:'post',
              data:{
                  mobile:this.phone,
                  code:this.code,
                  invite_id:this.getQueryString('invite_id'),
              },
              success:function(res) {
                  if(res.code == 200) {
                      _this.isRegister = true;
                      _this.showToast('注册成功');
                  }else {
                      _this.showToast(res.msg);
                  }

              }
          });
      },
      //隐藏弹框
      hideModal() {
        this.isRegister = false;
      },
      //判断是否是手机号
      isPhoneNumber(tel) {
        var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
        return reg.test(tel);
      },
      //显示toast
      showToast(msg) {
          this.toastText = msg;
          this.isToasting = true;
          setTimeout(() => {
              this.isToasting = false;
          }, 2000);
      },
      //获取invite_id
      getQueryString(key) {
        let search = window.location.search.replace(/^\?/, "");
        let pairs = search.split("&");
        let paramsMap = pairs.map(pair => {
            let [key, value] = pair.split("=");
            return [decodeURIComponent(key), decodeURIComponent(value)];
        }).reduce((res, [key, value]) => Object.assign(res, { [key]: value }), {});
        return paramsMap[key] || "";
      },
      params_aes(params) {
          var PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo6MMnrY7f5NOxSutybU0JZCd42st/OvaMmQoX3AhAWyuktc+urKpYq0fJROzKiN59QXRNvqllUVD0P068PDltqqA9uQAy8BqlS0kFTw8ZtbsEgKYxmOCaWQ6ljXkdDT82iAHT2tKqYqP+Ws2DfVO+uHIFl442udHc9huuWz+xu+qviyD4VlmViW0dxkdzofwl6vPXOG0AI3+Xmnto43md1OfcVAgozUb4f7pCT9ZY3nNRSuYm4zVHNg0iFcZ37s3b/VfsbVOXgKGBvPfzKIOnNEdAgnM4ObxKfOztjEfV6AoGsPPOHXr28nM+hkry7EFGTNe0rRnQyscjeqpj7zjSwIDAQAB-----END PUBLIC KEY-----';
          var encrypt_rsa = new RSA.RSAKey();
          encrypt_rsa = RSA.KEYUTIL.getKey(PUBLIC_KEY);
          var encStr = encrypt_rsa.encrypt(params)
          encStr = RSA.hex2b64(encStr);
          console.log("加密结果：" + encStr);
          return encStr;
      },
      header_md5_aes_base64(params) {
          if(typeof params == 'object') params = JSON.stringify(params);
          params = '!sp' + params + 'mans!';
          let md5Str = md5(params);
          console.log("md5加密结果：" + md5Str);
          const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo6MMnrY7f5NOxSutybU0JZCd42st/OvaMmQoX3AhAWyuktc+urKpYq0fJROzKiN59QXRNvqllUVD0P068PDltqqA9uQAy8BqlS0kFTw8ZtbsEgKYxmOCaWQ6ljXkdDT82iAHT2tKqYqP+Ws2DfVO+uHIFl442udHc9huuWz+xu+qviyD4VlmViW0dxkdzofwl6vPXOG0AI3+Xmnto43md1OfcVAgozUb4f7pCT9ZY3nNRSuYm4zVHNg0iFcZ37s3b/VfsbVOXgKGBvPfzKIOnNEdAgnM4ObxKfOztjEfV6AoGsPPOHXr28nM+hkry7EFGTNe0rRnQyscjeqpj7zjSwIDAQAB-----END PUBLIC KEY-----';
          var encrypt_rsa = new RSA.RSAKey();
          encrypt_rsa = RSA.KEYUTIL.getKey(PUBLIC_KEY);
          var encStr = encrypt_rsa.encrypt(md5Str);
          encStr = RSA.hex2b64(encStr);
          console.log("md5 rsa加密结果：" + encStr);
          // let base64Str = Base64.encode(encStr);
          // console.log("md5 rsa base64加密结果：" + base64Str);
          return encStr;
      }
    }
})
