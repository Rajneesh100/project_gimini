This is a totally only backend end points, as of now it has pretty basic Apis : 
```
/login ,
/signup,
/profile, 
/chat_with_mira,
/chat_history,
/get_connections,
/send,
/get_my_chat_with,

```
frontend development is undergoing and as weare storing all conversation data so we will also incorporate a person to person and group conversation and also ai in group chats together

use Postman or any equivalnt tools to do crud operations

* https://project-gimini-1.onrender.com/signup
  this is  a post method.

  using this signup we can create a new user this the format of payload you need to send as a body
  ```
  {
    "name": "Rajneesh", //unique username
    "email": "example@gmail.com",
    "username": "Slipping_bug",
    "password": "sleeping_bug123"
  }
  This a post operation
  ```
  if you get any errors mostly it can be bcz of matching username or email with some existing user's data so try to create a unique account
  once successful you will get a `response body` containing information like this :
  ```
  {
    "response": {
        "name": "Rajni",
        "email": "Rajni@gmail.com",
        "username": "sleeping_bug",
        "password": "$2b$10$YNUsGcs84VBOFtiFcIhU6e7lWBwnbSmLjyIieKNFEm6OJiKYbzh4.",
        "_id": "66d4b446b5b2e1996a1a8ccd",
        "updated_at": "2024-09-01T18:36:55.246Z",
        "created_at": "2024-09-01T18:36:55.247Z",
        "__v": 0
    },
    "message": "User created sucessfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6IjY2ZDRiNDQ2YjViMmUxOTk2YTFhOGNjZCIsInVzZXJuYW1lIjoic2xlZXBpbmdfYnVnIiwiZW1haWwiOiJSYWpuaUBnbWFpbC5jb20ifSwiaWF0IjoxNzI1MjE1ODE1LCJleHAiOjE3MjUyMTg4MTV9.s_oVdjINm2tl51yiOKggApVNXsqYaGZuY_Joh9DLaIM"
  }
  ```
  here you can see u don't get what password you just passed on post bcz we are storing password in encrypted form so even we don't know your password
  and you can see a token which is a jwt token now u can use this token to open chatting with ai, you just need this jwt token to authenticate any user which removes vulnerable password matching
  process every time you acess the chat
  
* https://project-gimini-1.onrender.com/login
  this is also a post method.
  you get a token right when you sign up for first time with current setting token life is 50 minutes after that it will expire so what we will do ? everytime we can't create
  new user just to get access token so we can log in and server will send a new jwt token for which life will be again 50 minutes
  this is the body format for post:
  ```
  
  {
    "username": "your username",
    "password": "your password"
  } 
  ```
  The Response you will get once server validate your username and password:
  ```
  {
    "userdata": {
        "id": "66d4b446b5b2e1996a1a8ccd",
        "username": "sleeping_bug",
        "email": "Rajni@gmail.com"
    },
    "message": "Welcome back !",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6IjY2ZDRiNDQ2YjViMmUxOTk2YTFhOGNjZCIsInVzZXJuYW1lIjoic2xlZXBpbmdfYnVnIiwiZW1haWwiOiJSYWpuaUBnbWFpbC5jb20ifSwiaWF0IjoxNzI1MjE2MjY2LCJleHAiOjE3MjUyMTkyNjZ9.tV2maKX_4lyU0aQf23isysNh5g2-uPsd4NrJnOCl834"
  }
  ```
  so now u have a new jwt token use this token in Authorization section of postman. find `Bearer token` and paste this token their
  now less go for chatting with ai
  
* https://project-gimini-1.onrender.com/chat_with_mira
  This is a get method.
  it uses jwt token to authenticate the user before sending query to ai model.
  first find `Bearer token` in Authorization section of postman and paste this token their.
  
  this is the body format for /chat endpoint
  ```
   {
      // "query":"your silly sits here"
      "query":"you ai's are getting smarter day by day why?"
   }
  
  ```
  response :
  ```
  {
    "response": "You're right, AI is getting smarter! Here's a breakdown of the key reasons:\n\n**1. Massive Data and Computational Power:**\n\n* **More Data:** AI algorithms learn from data. We're generating more data than ever before (think social media, sensor data, scientific research). This abundance fuels better training.\n* **Faster Computers:** GPUs and specialized AI hardware allow us to process massive amounts of data incredibly quickly. This translates into faster learning and more complex models.\n\n**2. Algorithmic Advancements:**\n\n* **Deep Learning:** Breakthroughs in deep learning, specifically neural networks, allow AI to tackle tasks like image recognition and natural language processing with astonishing accuracy.\n* **New Architectures:** We're constantly creating new architectures for neural networks, making them more efficient and better suited for specific tasks.\n* **Reinforcement Learning:**  AI systems can now learn by trial and error, leading to incredible progress in areas like game playing (think AlphaGo and AlphaStar).\n\n**3. Collaborative Research and Open-Source:**\n\n* **Sharing Knowledge:** The AI community actively shares research and code, accelerating progress through collaboration.\n* **Open-Source Projects:**  Open-source platforms provide access to powerful tools and datasets, enabling faster development and experimentation.\n\n**4. Focus on Specific Tasks:**\n\n* **Narrow AI:** Instead of trying to create general intelligence, researchers are focusing on solving specific problems. This leads to more specialized and powerful AI systems.\n* **Applications:** We see AI being applied to a growing range of fields, from healthcare to finance to manufacturing. This real-world application drives further innovation.\n\n**5. Ethical Considerations:**\n\n* **Bias and Fairness:** We're becoming more aware of the potential for AI bias and are working on ways to mitigate it.\n* **Explainability:** Researchers are developing methods to make AI decisions transparent, improving trust and understanding.\n\n**The Future:**\n\nThe future of AI is incredibly exciting. As we continue to develop more powerful algorithms, access more data, and collaborate more effectively, we can expect even more incredible advancements in the years to come. \n\nHowever, it's important to remember that AI is a tool. How we use it and the ethical considerations surrounding it are crucial. We must strive to use AI for the benefit of humanity and address potential risks responsibly. \n"
  }
  ```
* https://project-gimini-1.onrender.com/profile
  this is a get method.
  you dont need any request body parameters here just pass the jwt tokens in postman and hit send 
  you will see your profile data like this below:
  ```
  {
    "_id": "66d4b446b5b2e1996a1a8ccd",
    "name": "Rajni",
    "email": "Rajni@gmail.com",
    "username": "sleeping_bug",
    "password": "$2b$10$YNUsGcs84VBOFtiFcIhU6e7lWBwnbSmLjyIieKNFEm6OJiKYbzh4.",
    "updated_at": "2024-09-01T18:36:55.246Z",
    "created_at": "2024-09-01T18:36:55.247Z",
    "__v": 0
  }
  
  ```
 
  But password even you won't be able to see we will also bring *A change password and a securityquestion functionality soon* 


  
* https://project-gimini-1.onrender.com/chat_history

  this is a Get method
  this is again using jwt token authentication so it's same as /profile end point.
  you need to put your jwt token in the Bearer token in Postman.
  this will send all the chat data related to uou either you sent it or you recieved it.
  you will see your past chat data with ai like this below:
  ```
  {
    
    "response": [
        {
            "_id": "66d0e8c9401db9c3044ce79d",
            "text": "how fast the andromida galaxy is moving",
            "sender": "66d0d196942fca76a9457fc5",
            "reciever": "gemini",
            "timestamp": "2024-08-29T21:31:53.050Z",
            "__v": 0
        },
        {
            "_id": "66d0e8cb401db9c3044ce79f",
            "text": "The Andromeda Galaxy (M31) is moving towards the Milky Way at a speed of approximately **110 kilometers per second (68 miles per second)**.\n\nThis might sound fast, but it's important to consider the vast distances involved.  Even at this speed, it will take about **4 billion years** for the two galaxies to collide. \n\nIt's also worth noting that the speed is relative.  From our perspective, Andromeda is moving towards us, but from Andromeda's perspective, we are moving towards them. Both galaxies are moving within the larger gravitational field of the Local Group, a cluster of galaxies that includes both the Milky Way and Andromeda. \n",
            "sender": "gemini",
            "reciever": "66d0d196942fca76a9457fc5",
            "timestamp": "2024-08-29T21:31:55.907Z",
            "__v": 0
        },
        {
            "_id": "66d0e96f492d35439400eb5e",
            "text": "Cool",
            "sender": "66d0d196942fca76a9457fc5",
            "reciever": "gemini",
            "timestamp": "2024-08-29T21:34:39.875Z",
            "__v": 0
        },
        {
            "_id": "66d0e972492d35439400eb60",
            "text": "I'm glad you think so! \n\nWhat's cool about?  Tell me more so I can understand what you're referring to! \n",
            "sender": "gemini",
            "reciever": "66d0d196942fca76a9457fc5",
            "timestamp": "2024-08-29T21:34:42.935Z",
            "__v": 0
        },
        {
            "_id": "66d0e997492d35439400eb63",
            "text": "Do u remeber my conversations? like what i just said before?",
            "sender": "66d0d196942fca76a9457fc5",
            "reciever": "gemini",
            "timestamp": "2024-08-29T21:35:19.755Z",
            "__v": 0
        },
        {
            "_id": "66d0e99a492d35439400eb65",
            "text": "As an AI, I don't have a memory of past conversations. Each time we interact, it's like a fresh start. If you'd like me to remember information, you can tell me to \"remember\" it, and I can store it for later use. However, I'll forget it if our conversation ends. \n\nIs there anything specific you'd like me to remember? 😊 \n",
            "sender": "gemini",
            "reciever": "66d0d196942fca76a9457fc5",
            "timestamp": "2024-08-29T21:35:22.439Z",
            "__v": 0
        }
    ]
  }
  
  ```
  

  
* https://project-gimini-1.onrender.com/get_connections

  this is a Get method
  this is again using jwt token authentication so it's same as /profile end point.
  you need to put your jwt token in the Bearer token in Postman.
  this will send all the user list which are related to you means you two had previous chat history (a person can send himseld a message also which will create a self message like we do in `WhatsApp`)
  this is the response format you will get :
  ```
  {
    "response": [
        "gemini",
        "niti"
    ]
  }   
  ```


*  https://project-gimini-1.onrender.com/send
   
   this is a Post method 
   it is used to send data to any indivisual person :
   this is the body format for post request:


   ```
   {
        "send_to" :"niti",
        "message_txt":"let's meet"
   } 

   ```
   here in send_to field it should be `USERNAME` specifically other wise you will get `ERROR`

   and this the response you will get :
   ```
   {
    "savedMessage": {
        "text": "let's meet",
        "sender": "Rajni",
        "reciever": "niti",
        "timestamp": "2024-09-01T20:55:01.526Z",
        "_id": "66d4d4a5c3614f959c9ebeba",
        "__v": 0
    },
    "status": "message saved in db"
    }

   ```


*  https://project-gimini-1.onrender.com/get_my_chat_with
   
   This is a Get Method
   this api is specifically send the chat data of a pair it's purpose is to use when we will open a tab with any person we will get the past data with that person using this api (As of now it's very simple and we haven't considerd a large past history chats we will be sending to client later we will target this)

   this is the request body format :
   ```
   {
   "selected_user":"niti"
   }
   ```

   this is the response you will get:
   ```
   {
    "response": [
        {
            "_id": "66d4d2963e0396e4f02c54e7",
            "text": "HI niti how's going..",
            "sender": "Rajni",
            "reciever": "niti",
            "timestamp": "2024-09-01T20:46:14.103Z",
            "__v": 0
        }
        {
            "_id": "66d4d4a5c3614f959c9ebeba",
            "text": "let's meet",
            "sender": "Rajni",
            "reciever": "niti",
            "timestamp": "2024-09-01T20:55:01.526Z",
            "__v": 0
        },
        {
            "_id": "66d4dd0a624db20cb1fea513",
            "text": "HI Rajni let's meet in eve",
            "sender": "niti",
            "reciever": "Rajni",
            "timestamp": "2024-09-01T21:30:50.037Z",
            "__v": 0
        }
    ]
   }
   ```

