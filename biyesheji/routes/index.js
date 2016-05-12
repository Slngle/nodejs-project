var crypto = require('crypto'),
    User = require('../models/user.js'),
    Post = require('../models/post.js'),
    Comment = require('../models/comment.js'),
    url = require('url');
var lib = require('../lib/index.js');
module.exports = function(app) {
    /*
        失物招领注册逻辑
        name        注册名
        password    密码
        phone       手机号码
    */
    app.get('/graduationDesign/api/lostAndFound/reg',function(req,res) {
      var params = url.parse(req.url,true);
      var query = params.query;
      var name = query && query.name;
      var password = query && query.password;
      var phone = query && query.phone;

      var md5 = crypto.createHash('md5');
      password = md5.update(password).digest('hex');

      var user = {
          name:name,
          password:password,
          phone:phone
      }

      //缺少参数
      if(!name || !password || !phone) {
          var data = {
              status:false,
              message:"缺少参数！"
          };
          lib.sendData(params,data,res);
          return;
      }

      var newUser = new User(user);

      User.get(newUser.phone, function (err, user) {
        //存入数据库失败
        if (err) {
          var data = {
              status:false,
              message:"服务端错误！",
              error:err
          }
          lib.sendData(params,data,res);
          return;
        }
        //用户名存在
        if (user) {
          var data = {
              status:false,
              message:"用户已存在！"
          }
          lib.sendData(params,data,res);
          return;
        }
        newUser.save(function (err, user) {
          if (err) {
            var data = {
                status:false,
                message:"服务端错误！",
                error:err
            }
            lib.sendData(params,data,res);
            return;
          }
          req.session.user = user;
          var data = {
              status:true,
              message:"注册成功",
          }
          lib.sendData(params,data,res);
          return;
        });
      });
    });

    /*
      失物招领登陆逻辑
      phone 手机号码
      password 密码
    */
    app.get('/graduationDesign/api/lostAndFound/login',function(req,res) {

      var params = url.parse(req.url,true);
      var query = params.query;
      var phone = query && query.phone;
      var password = query && query.password;
      var md5 = crypto.createHash('md5');
      password = md5.update(password).digest('hex');

      if (req.session && req.session.user) {
        var data = {
          status:false,
          message:"已登录！"
        }
        lib.sendData(params,data,res);
        return;
      }

      User.get(phone, function (err, user) {
        if (!user) {
          var data = {
            status:false,
            message:"用户不存在"
          }
          lib.sendData(params,data,res);
          return;
        }

        if (user.password != password) {
          var data = {
            status:false,
            message:"密码错误!"
          }
          lib.sendData(params,data,res);
          return;
        }
        req.session.user = user;
        var data = {
            status:true,
            entry:{
            }
        }
        lib.sendData(params,data,res);
      });
    });

    /*
      失物招领注销逻辑
    */
    app.get('/graduationDesign/api/lostAndFound/logout',function (req,res) {
      var params = url.parse(req.url,true);
      req.session.user = null;
      var data = {
          status:true,
          message:"注销成功"
      };
      lib.sendData(params,data,res);
    });
    
    /*
      失物招领发布逻辑
      type = "lost" & "found"
      des = " text "
      itemType = "钥匙"
      Ltime = "2016-3-15"
      area = "1号楼"
    */
    app.get('/graduationDesign/api/lostAndFound/post',function (req,res) {
      var params = url.parse(req.url,true);
      var query = params.query;
      if(!req.session.user) {
          var data = {
              status:false,
              message:"请登录"
          };
          lib.sendData(params,data,res);
          return;
      }else {
          var name = req.session.user.name;
          var phone = req.session.user.phone;
          var des = query && query.des;
          var type = query && query.type;
          var itemType = query && query.itemType;
          var Ltime = query && query.Ltime;
          var area  = query && query.area;
          var PostList = new Post(name,phone,des,type,itemType,Ltime,area);
          PostList.save(function(err) {
              if(err) {
                  var data = {
                      status:false,
                      message:"存入数据库失败",
                      err:err
                  };
                  lib.sendData(params,data,res);
                  return;
              }
              else {
                  var data = {
                      status:true,
                      message:"提交成功",
                  };
                  lib.sendData(params,data,res);
                  return;
              }
          });
      }
    });


    /*
      失物招领获取信息逻辑
      queryThing:{
        type = "lost" & "found" 
        itemType:"钥匙",
        Ltime = "2016-3-15",
        area = "1号楼",
      },
      page:1 第几页
    */
    app.get('/graduationDesign/api/lostAndFound/getPosts',function (req,res) {
      var params = url.parse(req.url,true);
      var query = params.query;
      var queryThing = query && query.queryThing && JSON.parse(query.queryThing);
      var page = query && query.page;
      Post.getTen(queryThing,page,function(err,docs,total) {
          if(err) {
              var data = {
                status:false,
                message:"取出数据失败！"
              }
              lib.sendData(params,data,res);
          }else {
              var data = {
                  status:true,
                  entry:{
                      docs:docs,
                      total:total
                  }
              }
              lib.sendData(params,data,res);
          }
      });
    });

    /*
      失物招领获取详细信息逻辑
      ArticleID
    */
    app.get('/graduationDesign/api/lostAndFound/getDetail',function (req,res) {
      var params = url.parse(req.url,true);
      var query = params.query;
      var ArticleID = query && query.ArticleID;
      Post.getDetail(ArticleID,function(err,docs) {
          if(err) {
              var data = {
                status:false,
                message:"取出数据失败！"
              }
              lib.sendData(params,data,res);
          }else {
              var data = {
                  status:true,
                  entry:{
                      docs:docs
                  }
              }
              lib.sendData(params,data,res);
          }
      });
    });

    //获取用户的个人信息 和自己的发布过的信息
    /*
      需要登录
      不需要参数
    */
    app.get('/graduationDesign/api/lostAndFound/getUserOwn',function (req,res) {
      var params = url.parse(req.url,true);
      var query = params.query;
      if(!req.session.user) {
          var data = {
              status:false,
              message:"请登录"
          };
          lib.sendData(params,data,res);
          return;
      }else {
          var phone = req.session.user.phone;
          var queryThing = {
              phone:phone
          };
          var page = query && query.page;

          Post.getTen(queryThing,page,function(err,docs,total) {
              if(err) {
                  var data = {
                    status:false,
                    message:"取出数据失败！"
                  }
                  lib.sendData(params,data,res);
              }else {
                  var data = {
                      status:true,
                      entry:{
                          name:req.session.user.name,
                          docs:docs,
                          total:total
                      }
                  }
                  lib.sendData(params,data,res);
              }
          });
      }
    });

    //个人中心中 关闭丢失或找到物品的活跃状态
    /*
        ArticleID:
        isover:
    */
    app.get('/graduationDesign/api/lostAndFound/closeStatus',function (req,res) {
      var params = url.parse(req.url,true);
      var query = params.query;
      if(!req.session.user) {
          var data = {
              status:false,
              message:"请登录"
          };
          lib.sendData(params,data,res);
          return;
      }else {
          var ArticleID = query && query.ArticleID;
          var isover = query && query.isover;
          console.log(req.session.user.phone);
          Post.setOver(ArticleID,isover,req.session.user.phone,function(err) {
              if(err) {
                  var data = {
                    status:false,
                    message:"设置失败！",
                    err:err
                  }
                  lib.sendData(params,data,res);
              }else {
                  var data = {
                      status:true,
                      message:'设置成功！'
                  }
                  lib.sendData(params,data,res);
              }
          });
      }
    });

    //文章评论逻辑
    /*
      ArticleID:,
      comments:{
          receiveName :'被发表评论或者被回复人的昵称',
          content: 'sasasasa',
      }
    */

    app.get('/graduationDesign/api/lostAndFound/setComments',function (req,res) {
      var params = url.parse(req.url,true);
      var query = params.query;
      if(!req.session.user) {
          var data = {
              status:false,
              message:"请登录"
          };
          lib.sendData(params,data,res);
          return;
      }else {
            var ArticleID = query && query.ArticleID;
            var comments = (function() {
                try {
                  var cs = JSON.parse(query && query.comments);
                  cs.postName = req.session.user.name;
                  return cs
                }catch(ex) {
                  console.log(ex);
                }
            })();
            var pushComment = new Comment(ArticleID,comments);
            pushComment.save(function(err) {
              if(err) {
                var data = {
                    status:false,
                    message:"评论失败！",
                    err:err
                };
                lib.sendData(params,data,res);
              }else {
                var data = {
                    status:true,
                    message:"评论成功！",
                };
                lib.sendData(params,data,res);
              }
            });
      }
    });


//   app.get('/', function (req, res) {
//     //判断是否是第一页，并把请求的页数转换成 number 类型
//     var page = parseInt(req.query.p) || 1;
//     //查询并返回第 page 页的 10 篇文章
//     Post.getTen(null, page, function (err, posts, total) {
//         if (err) {
//           posts = [];
//         } 
//         console.log(req.session.user);
//         res.render('index', {
//           title: '主页',
//           posts: posts,
//           page: page,
//           isFirstPage: (page - 1) == 0,
//           isLastPage: ((page - 1) * 10 + posts.length) == total,
//           user: req.session.user,
//           success: req.flash('success').toString(),
//           error: req.flash('error').toString()
//         });
//     });
//   }); 

//   app.get('/reg', checkNotLogin);
//   app.get('/reg', function (req, res) {
//     res.render('reg', {
//       title: '注册',
//       user: req.session.user,
//       success: req.flash('success').toString(),
//       error: req.flash('error').toString()
//     });
//   });

//   app.post('/reg', checkNotLogin);
//   app.post('/reg', function (req, res) {
//     var name = req.body.name,
//         password = req.body.password,
//         password_re = req.body['password-repeat'];
//     if (password_re != password) {
//       req.flash('error', '两次输入的密码不一致!'); 
//       return res.redirect('/reg');
//     }
//     var md5 = crypto.createHash('md5'),
//         password = md5.update(req.body.password).digest('hex');
//     var newUser = new User({
//         name: name,
//         password: password,
//         email: req.body.email
//     });
//     User.get(newUser.name, function (err, user) {
//       if (err) {
//         req.flash('error', err);
//         return res.redirect('/');
//       }
//       if (user) {
//         req.flash('error', '用户已存在!');
//         return res.redirect('/reg');
//       }
//       newUser.save(function (err, user) {
//         if (err) {
//           req.flash('error', err);
//           return res.redirect('/reg');
//         }
//         req.session.user = user;
//         req.flash('success', '注册成功!');
//         res.redirect('/');
//       });
//     });
//   });

//   app.get('/login', checkNotLogin);
//   app.get('/login', function (req, res) {
//     res.render('login', {
//       title: '登录',
//       user: req.session.user,
//       success: req.flash('success').toString(),
//       error: req.flash('error').toString()
//     }); 
//   });

//   app.post('/login', checkNotLogin);
//   app.post('/login', function (req, res) {
//     var md5 = crypto.createHash('md5'),
//         password = md5.update(req.body.password).digest('hex');
//     User.get(req.body.name, function (err, user) {
//       if (!user) {
//         req.flash('error', '用户不存在!'); 
//         return res.redirect('/login');
//       }
//       if (user.password != password) {
//         req.flash('error', '密码错误!'); 
//         return res.redirect('/login');
//       }
//       req.session.user = user;
//       req.flash('success', '登陆成功!');
//       res.redirect('/');
//     });
//   });

//   app.get('/post', checkLogin);
//   app.get('/post', function (req, res) {
//     res.render('post', {
//       title: '发表',
//       user: req.session.user,
//       success: req.flash('success').toString(),
//       error: req.flash('error').toString()
//     });
//   });

//   app.post('/post', checkLogin);
//   app.post('/post', checkLogin);
//   app.post('/post', function (req, res) {
//     // var currentUser = req.session.user,
//     //     post = new Post(currentUser.name, req.body.title, req.body.post);
//     var currentUser = req.session.user,
//         tags = [req.body.tag1, req.body.tag2, req.body.tag3],
//         post = new Post(currentUser.name, req.body.title, tags, req.body.post);

//     post.save(function (err) {
//       if (err) {
//         req.flash('error', err); 
//         return res.redirect('/');
//       }
//       req.flash('success', '发布成功!');
//       res.redirect('/');//发表成功跳转到主页
//     });
//   });

//   app.get('/logout', checkLogin);
//   app.get('/logout', function (req, res) {
//     req.session.user = null;
//     req.flash('success', '登出成功!');
//     res.redirect('/');
//   });

//   app.get('/upload', checkLogin);
//   app.get('/upload', function (req, res) {
//     res.render('upload', {
//       title: '文件上传',
//       user: req.session.user,
//       success: req.flash('success').toString(),
//       error: req.flash('error').toString()
//     });
//   });

//   app.post('/upload', checkLogin);
//   app.post('/upload', function (req, res) {
//     req.flash('success', '文件上传成功!');
//     res.redirect('/upload');
//   });

//   app.get('/links', function (req, res) {
//     res.render('links', {
//       title: '友情链接',
//       user: req.session.user,
//       success: req.flash('success').toString(),
//       error: req.flash('error').toString()
//     });
//   });

//   app.get('/search', function (req, res) {
//     Post.search(req.query.keyword, function (err, posts) {
//       if (err) {
//         req.flash('error', err); 
//         return res.redirect('/');
//       }
//       res.render('search', {
//         title: "SEARCH:" + req.query.keyword,
//         posts: posts,
//         user: req.session.user,
//         success: req.flash('success').toString(),
//         error: req.flash('error').toString()
//       });
//     });
//   });

//   app.get('/u/:name', function (req, res) {
//     var page = parseInt(req.query.p) || 1;
//     //检查用户是否存在
//     User.get(req.params.name, function (err, user) {
//       if (!user) {
//         req.flash('error', '用户不存在!'); 
//         return res.redirect('/');
//       }
//       //查询并返回该用户第 page 页的 10 篇文章
//       Post.getTen(user.name, page, function (err, posts, total) {
//         if (err) {
//           req.flash('error', err); 
//           return res.redirect('/');
//         } 
//         res.render('user', {
//           title: user.name,
//           posts: posts,
//           page: page,
//           isFirstPage: (page - 1) == 0,
//           isLastPage: ((page - 1) * 10 + posts.length) == total,
//           user: req.session.user,
//           success: req.flash('success').toString(),
//           error: req.flash('error').toString()
//         });
//       });
//     }); 
//   });

//   app.get('/archive', function (req, res) {
//     Post.getArchive(function (err, posts) {
//       if (err) {
//         req.flash('error', err); 
//         return res.redirect('/');
//       }
//       res.render('archive', {
//         title: '存档',
//         posts: posts,
//         user: req.session.user,
//         success: req.flash('success').toString(),
//         error: req.flash('error').toString()
//       });
//     });
//   });

//   app.get('/tags', function (req, res) {
//     Post.getTags(function (err, posts) {
//       if (err) {
//         req.flash('error', err); 
//         return res.redirect('/');
//       }
//       res.render('tags', {
//         title: '标签',
//         posts: posts,
//         user: req.session.user,
//         success: req.flash('success').toString(),
//         error: req.flash('error').toString()
//       });
//     });
//   });

// app.get('/tags/:tag', function (req, res) {
//   Post.getTag(req.params.tag, function (err, posts) {
//     if (err) {
//       req.flash('error',err); 
//       return res.redirect('/');
//     }
//     res.render('tag', {
//       title: 'TAG:' + req.params.tag,
//       posts: posts,
//       user: req.session.user,
//       success: req.flash('success').toString(),
//       error: req.flash('error').toString()
//     });
//   });
// });

//   app.get('/u/:name/:day/:title', function (req, res) {
//     Post.getOne(req.params.name, req.params.day, req.params.title, function (err, post) {
//       if (err) {
//         req.flash('error', err); 
//         return res.redirect('/');
//       }
//       res.render('article', {
//         title: req.params.title,
//         post: post,
//         user: req.session.user,
//         success: req.flash('success').toString(),
//         error: req.flash('error').toString()
//       });
//     });
//   });

//   app.post('/u/:name/:day/:title', function (req, res) {
//     var date = new Date(),
//         time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
//                date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
//     var comment = {
//         name: req.body.name,
//         email: req.body.email,
//         website: req.body.website,
//         time: time,
//         content: req.body.content
//     };
//     var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
//     newComment.save(function (err) {
//       if (err) {
//         req.flash('error', err); 
//         return res.redirect('back');
//       }
//       req.flash('success', '留言成功!');
//       res.redirect('back');
//     });
//   });

//   app.get('/edit/:name/:day/:title', checkLogin);
//   app.get('/edit/:name/:day/:title', function (req, res) {
//     var currentUser = req.session.user;
//     Post.edit(currentUser.name, req.params.day, req.params.title, function (err, post) {
//       if (err) {
//         req.flash('error', err); 
//         return res.redirect('back');
//       }
//       res.render('edit', {
//         title: '编辑',
//         post: post,
//         user: req.session.user,
//         success: req.flash('success').toString(),
//         error: req.flash('error').toString()
//       });
//     });
//   });

// app.post('/edit/:name/:day/:title', checkLogin);
// app.post('/edit/:name/:day/:title', function (req, res) {
//   var currentUser = req.session.user;
//   var tags = [req.body.tag1, req.body.tag2, req.body.tag3];
//   Post.update(currentUser.name, req.params.day, req.params.title, req.body.post,tags, function (err) {
//     var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
//     if (err) {
//       req.flash('error', err); 
//       return res.redirect(url);//出错！返回文章页
//     }
//     req.flash('success', '修改成功!');
//     res.redirect(url);//成功！返回文章页
//   });
// });


// app.get('/remove/:name/:day/:title', checkLogin);
// app.get('/remove/:name/:day/:title', function (req, res) {
//   var currentUser = req.session.user;
//   Post.remove(currentUser.name, req.params.day, req.params.title, function (err) {
//     if (err) {
//       req.flash('error', err); 
//       return res.redirect('back');
//     }
//     req.flash('success', '删除成功!');
//     res.redirect('/');
//   });
// });

//   app.use(function (req, res) {
//     res.render("404");
//   });

//   function checkLogin(req, res, next) {
//     if (!req.session.user) {
//       req.flash('error', '未登录!'); 
//       res.redirect('/login');
//     }
//     next();
//   }

//   function checkNotLogin(req, res, next) {
//     if (req.session.user) {
//       req.flash('error', '已登录!'); 
//       res.redirect('back');
//     }
//     next();
//   }
};

