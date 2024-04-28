const mongodbConnection = require('./helper/mongodb.js');
const mysqldbConnection = require("./helper/mysql");
const express = require('express');

const app = express();
app.use(express.json()); 

function checkConnections(){
  mongodbConnection.connection.once('open', () => {
    console.log('MongoDB bağlantısı başarıyla kuruldu');
  });
  mongodbConnection.connection.on('error', (err) => {
    console.error('MongoDB bağlantı hatası:', err);
  });
  mysqldbConnection.getConnection((err, connection) => {
    if (err) {
      console.log("MySQL bağlantısı kurulurkan hata: ", err);
    } else {
      console.log("MySQL bağlantısı başarıyla kuruldu");
    }
  });
}
checkConnections();


app.get("/", async (req, res) => {
  res.send(`Hoşgeldiniz!`);
});


app.post('/add-post', (req, res) => {
  const { author_name, title, content } = req.body;

  if (!author_name || !title || !content) {
    return res.status(400).send('Eksik bilgi');
  }

  const sql = 'INSERT INTO posts (author_name, title, content) VALUES (?, ?, ?)';
  mysqldbConnection.query(sql, [author_name, title, content], (err, results) => {
    if (err) {
      console.error("Veritabanına ekleme sırasında hata:", err);
      return res.status(500).send('Veritabanı hatası');
    }

    res.status(201).send({
      message: 'Post başarıyla eklendi',
      postId: results.insertId
    });
  });
});


// app.get('/posts', (req, res) => {
//   const sql = 'SELECT * FROM posts';
//   mysqldbConnection.query(sql, (err, results) => {
//     if (err) {
//       console.error("Veritabanı hatası:", err);
//       return res.status(500).send('Veritabanı hatası');
//     }
//     res.status(200).json(results);
//   });
// });


// app.get('/posts/:id/comments', async (req, res) => {
//   const postId = req.params.id;

//   try {
//     const comments = await Comment.find({ postId }).exec();
//     res.status(200).json(comments);
//   } catch (err) {
//     console.error("MongoDB'den yorumları çekme hatası:", err);
//     res.status(500).send("Sunucu hatası");
//   }
// });

// app.get('/posts/:id/likes', async (req, res) => {
//   const postId = req.params.id;

//   try {
//     const likes = await Like.find({ postId }).exec(); 
//     res.status(200).json(likes);
//   } catch (err) {
//     console.error("MongoDB'den like'ları çekme hatası:", err);
//     res.status(500).send("Sunucu hatası");
//   }
// });


app.get('/posts', async (req, res) => {
  const sql = 'SELECT * FROM posts';

  // MySQL'den postları alıyorum
  mysqldbConnection.query(sql, async (err, posts) => {
    if (err) {
      console.error("Veritabanı hatası:", err);
      return res.status(500).send('Veritabanı hatası');
    }

    // MongoDB'den yorumları ve beğenileri çekiyorum
    const promises = posts.map(async (post) => {
      const postId = post.id.toString(); // MySQL'den gelen post idsi
      const comments = await Comment.find({ postId }).exec();
      const likeCount = await Like.countDocuments({ postId }).exec();

      return {
        ...post,
        comments,
        likeCount,
      };
    });

    try {
      const enrichedPosts = await Promise.all(promises); // birleştiriyorum
      res.status(200).json(enrichedPosts); 
    } catch (error) {
      console.error("Verileri birleştirirken hata:", error);
      res.status(500).send("Sunucu hatası");
    }
  });
});


const LikeSchema = new mongodbConnection.Schema({
  postId: String,
  userId: String,
});

const Like = mongodbConnection.model('Like', LikeSchema);

app.post('/send-like', async (req, res) => {
  const { postId, userId } = req.body;

  const newLike = new Like({ postId, userId }); 

  try {
    await newLike.save(); 
    res.status(201).send("Like başarıyla eklendi");
  } catch (err) {
    console.error("MongoDB'ye like ekleme hatası:", err);
    res.status(500).send("Sunucu hatası");
  }
});



const CommentSchema = new mongodbConnection.Schema({
  postId: String,
  userId: String,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongodbConnection.model('Comment', CommentSchema);

app.post('/send-comment', async (req, res) => {
  const { postId, userId, comment } = req.body;

  const newComment = new Comment({ postId, userId, comment });

  try {
    await newComment.save();
    res.status(201).send("Yorum başarıyla eklendi");
  } catch (err) {
    console.error("MongoDB'ye yorum ekleme hatası:", err);
    res.status(500).send("Sunucu hatası");
  }
});





app.listen(5001, () => {
  console.log('Port 5001 üzerinde çalışıyor');
});