define({ "api": [
  {
    "type": "get",
    "url": "/api/apkDownload",
    "title": "apkDownload(apk下载)",
    "name": "apkDownload(apk下载)",
    "group": "Apk",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n开始下载APK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 50000,\n  msg: 'UnKnow-Error',\n  cb: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/apk.js",
    "groupTitle": "Apk"
  },
  {
    "type": "get",
    "url": "/api/getVersion",
    "title": "getVersion(获取apk版本号)",
    "name": "getVersion(获取apk版本号)",
    "group": "Apk",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 20000,\n  msg: 'Success',\n  cb: {\n         version: 111,\n         detail: 'hfdhfg'\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 50000,\n  msg: 'UnKnow-Error',\n  cb: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/apk.js",
    "groupTitle": "Apk"
  },
  {
    "type": "post",
    "url": "/api/ips",
    "title": "Ips(获取推流地址)",
    "name": "Ips(获取推流地址)",
    "group": "SubAccount",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证,必填,{headers:{authorization: Bearer [token]}}</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题,必填</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ip",
            "description": "<p>wowza推流地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cloudAddress",
            "description": "<p>云直播推流地址</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 20000,\n  msg: 'Success',\n  cb: {\n             ip: '192.168.1.119', \n             cloudAddress: 'rtmp://dnionpublish.seei.tv/liveTarget/'\n         }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 50000,\n  msg: 'UnKnow-Error',\n  cb: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/account.js",
    "groupTitle": "SubAccount"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "Login(子账号登录)",
    "name": "Login(子账号登录)",
    "group": "SubAccount",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号码,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码,必填</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "streamId",
            "description": "<p>串流码ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>串流码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "expireDate",
            "description": "<p>串流码过期时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 20000,\n  msg: 'Success',\n  cb: {\n             token: 'eyJhbGciOiJIUzI1NiJ9.YWRpbm5vMTIz.yqq_jFQRpXmMsDNXR-TTs6ryqNk_ru6SkGKIRrjjfhI',\n             streamId: '5d6c8b1b1e562b18841b90b9',\n             code: 'Y7OHvLwC8w1NsMt7fMp7UToQVuA4cgIo3UY0pOjX',\n             expireDate: '2020-09-02'\n         }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 50004,\n  msg: '账号或密码错误',\n  cb: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/account.js",
    "groupTitle": "SubAccount"
  },
  {
    "type": "post",
    "url": "/api/upload",
    "title": "Upload(上传)",
    "name": "Upload(上传)",
    "group": "Upload",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证,必填,{headers:{authorization: Bearer [token]}}</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>文件名,必填,放在multipart/form-data中</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>文件描述,必填,放在multipart/form-data中</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 20000,\n  msg: 'Success',\n  cb: {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 50000,\n  msg: 'UnKnow-Error',\n  cb: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/upload.js",
    "groupTitle": "Upload"
  }
] });
