export const socialCallbackTemplete = `
<html>
  <head>
  </head>
  <body>
    <input hidden value="{{id}}" id="id" />
    <input hidden value="{{type}}" id="type" />
    <input hidden value="{{account_type}}" id="account_type" />
    <input hidden value="{{email}}" id="email" />
  </body>
  <script>
  
    const id = document.getElementById('id');
    const type = document.getElementById('type');
    const account_type = document.getElementById('account_type');
    const email = document.getElementById('email');
    
    opener.postMessage({
      type:"social_login_callback",
      data: {
        id: id.value,
        type: type.value,
        account_type: account_type.value,
        email: email.value
      }
    },'*')
    self.close();
  </script>
</html>
`;
