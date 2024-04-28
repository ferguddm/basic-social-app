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



![1](https://github.com/ferguddm/basic-social-app/assets/58135307/b3c0a06a-c369-4582-b311-b5efe10320db)
![2](https://github.com/ferguddm/basic-social-app/assets/58135307/22846260-db61-4d10-add3-34e52c5ff223)
![3](https://github.com/ferguddm/basic-social-app/assets/58135307/62a90f3a-feee-46b2-8ccb-0da33f12f471)
![4](https://github.com/ferguddm/basic-social-app/assets/58135307/e3e1907e-c832-404a-b49e-68c1ce54e8a7)
![5](https://github.com/ferguddm/basic-social-app/assets/58135307/c8c3c411-59da-4560-a2a9-18a4d3d22273)
