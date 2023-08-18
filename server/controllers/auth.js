import bcrypt from "bcrypt"; // "bcrypt" kütüphanesi, şifreleri güvenli bir şekilde hashlemek ve hashlenmiş şifreleri doğrulamak için kullanılan bir kriptografik kütüphanedir
import jwt from "jsonwebtoken"; // Bu paket, JWT (JSON Web Token) oluşturma, işleme ve doğrulama işlemlerini yapmaya yardımcı olur. JWT'ler, istemci ve sunucu arasında güvenli bir şekilde veri aktarımı için kullanılır.
import User from "../models/User.js";

/* REGISTER USER */
/*  bir kullanıcının kaydını yapan bir fonksiyonu içerir. Fonksiyon, bir HTTP isteği (req) ve bir HTTP yanıtı (res) alır. */
export const register = async (req, res) => {
    /* Fonksiyon içinde, req.body'den firstName, lastName, email, password, picturePath, friends, location ve occupation özellikleri çıkarılır. */
    try {
        const { firstName, lastName, email, password, picturePath, friends, location, occupation, twitterLink, linkedinLink } = req.body;

        /* bcrypt modülü kullanılarak kullanıcının şifresi için bir tuz oluşturulur ve bu tuz kullanılarak şifre karma işlemi yapılır. Oluşan passwordHash, newUser nesnesinin password özelliğinde saklanır. */
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        /* Yeni bir kullanıcı nesnesi, User modelini kullanarak oluşturulur. viewedProfile ve impressions özellikleri, Math.floor ve Math.random yöntemleri kullanılarak rastgele tamsayı değerleri ile ayarlanır. */
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            twitterLink,
            linkedinLink,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        /* Son olarak, oluşturulan kullanıcı nesnesi veritabanına kaydedilir ve kaydedilen kullanıcı nesnesi, yanıtta 201 durum kodu ile birlikte JSON formatında döndürülür. */
        res.status(201).json(savedUser);
    } catch (err) {
        /* Eğer bir hata oluşursa, yanıtta 500 durum kodu ve hata mesajı JSON formatında döndürülür. */
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
/* kullanıcının email ve parola bilgilerini kullanarak giriş yapmasını sağlar. */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        /* Kullanıcının email bilgisi veritabanında aranır ve eşleşen bir kullanıcı bulunursa, bu kullanıcının parola bilgisi bcrypt.compare() fonksiyonu ile girilen parola ile karşılaştırılır. */
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "Email veya şifre hatalı" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Email veya şifre hatalı" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        /* Eğer parolalar eşleşirse, kullanıcının ID'si jwt.sign() fonksiyonu kullanılarak bir JWT (JSON Web Token) oluşturulur ve bu JWT, kullanıcı bilgileriyle birlikte 200 OK durum koduyla yanıt olarak gönderilir.  */
        res.status(200).json({ token, user });
    } catch (err) {
        /* . Eğer email veya parola yanlışsa, 400 Bad Request durum koduyla yanıt verilir ve "Kullanıcı adı veya şifre hatalı" mesajı döndürülür. */
        res.status(500).json({ error: err.message });
    }
};
