# MySQL - MONGO - KUBERNETES UYGULAMASI (Basit Sosyal App)

## Amaç
MySQL ve MongoDB gibi iki farklı veritabanını kullanarak blog postları, yorumlar ve beğenileri yönetmektir. MySQL'de blog postları saklanırken, MongoDB yorumlar ve beğeniler için kullanılır.

## Ana Bileşenler
Express.js Uygulaması,
MySQL Veritabanı: Blog postları için bir tablo oluşturur,
MongoDB Veritabanı: Yorumlar ve beğeniler için kullanılır. Her blog postuna ait yorumlar ve beğeniler burada saklanır.

## Endpoints (Rotalar)
Express.js'de oluşturulan endpointler, HTTP isteklerine yanıt verir. Örneğin, /posts tüm blog postlarını getirir, /send-like bir blog postuna beğeni ekler ve /send-comment bir blog postuna yorum ekler.


## Çalışma Prensibi
### Blog Postlarını Listeleme:
 /posts endpoint'i, MySQL'deki tüm blog postlarını alır ve JSON formatında döndürür. Bu esnada her post için MongoDB'den ilgili yorumları ve beğeni sayısını da alır.
### Blog Postuna Beğeni Ekleme:
 /send-like endpointi, belirtilen blog postuna MongoDB'de bir like ekler. Bu, kullanıcının postu beğenmesini simgeler.
### Blog Postuna Yorum Ekleme:
 /send-comment endpointi, belirtilen blog postuna MongoDB'de bir comment ekler. Bu, kullanıcının posta yorum yapmasını sağlar.
### Blog Postunun Yorumlarını ve Beğeni Sayısını Getirme:
 /posts/:id/comments ve /posts/:id/likes endpointleri, belirli bir blog postuna ait yorumları ve beğeni sayısını alır.


## Kullanım Senaryosu
### Bir Postu Görüntülemek: 
/posts endpointine GET isteği gönderildiğinde, tüm blog postları ve ilgili yorumlar ile beğeniler gelir.
### Bir Postu Beğenmek: 
/send-like endpointine POST isteği gönderildiğinde, ilgili blog postuna bir beğeni eklenir.
### Bir Posta Yorum Yapmak: 
/send-comment endpointine POST isteği gönderildiğinde, belirtilen blog postuna bir yorum eklenir.
### Bir Postun Yorumlarını ve Beğeni Sayısını Almak:
 /posts/:id/comments ve /posts/:id/likes endpointleri, belirli bir blog postuna ait yorumları ve beğeni sayısını alır.


## Özet
Bu uygulama, MySQL ve MongoDB'yi bir arada kullanarak blog postları, beğeniler ve yorumlar için bir RESTful API sağlar. Express.js, bu API'nin merkezinde yer alırken, MySQL ve MongoDB, ilgili veritabanı görevlerini yerine getirir. 


![görsel 1](../1.png)

![görsel 2](../2.png)

![görsel 3](../3.png)

![görsel 4](../4.png)

![görsel 5](../5.png)
