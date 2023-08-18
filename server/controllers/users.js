import User from "../models/User.js";

/* READ */
/*  kullanıcıya ait bilgileri belirtilen id parametresine göre veritabanından çeker ve başarılı bir şekilde işlem yapılırsa, kullanıcının bilgilerini içeren bir yanıt (response) döndürür */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        /* hata nesnesi içindeki message özelliği kullanılarak bir hata mesajı oluşturulur ve HTTP yanıtında status kodu 404 olarak ayarlanarak yanıt gönderilir. */
        res.status(404).json({ message: err.message });
    }
};

/* belirtilen kullanıcının arkadaşlarını bulan bir işlevi ifade ediyor. İşlev, belirtilen kullanıcının arkadaşlarına dair bilgileri içeren bir nesne dizisini döndürüyor. */
export const getUserFriends = async (req, res) => {
    try {
        /* İşlevde, belirtilen kullanıcının arkadaşlarından her birinin kimlik bilgileri kullanılarak User.findById yöntemi ile kullanıcı bilgileri çekiliyor. Bu işlem, Promise.all yöntemi kullanılarak paralel olarak gerçekleştiriliyor ve sonuçlar friends dizisinde toplanıyor. */
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
        /* Her arkadaşın bilgisi, _id, firstName, lastName, occupation, location ve picturePath özelliklerini içeren bir nesneye formatlanıyor.  */
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        });
        /* formatlanmış arkadaş nesneleri, formattedFriends dizisinde toplanıyor ve son olarak bu dizi,ifadesiyle HTTP yanıtı olarak gönderiliyor. */
        res.status(200).json(formattedFriends);
    } catch (err) {
        /* Eğer bir hata oluşursa, hata mesajı ifadesiyle yanıt olarak gönderiliyor. */
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
/* Bu fonksiyon arkadaş eklemek veya kaldırmak için kullanılır. Fonksiyonun içindeki ilk satırda, id ve friendId adlı iki parametre alınır. id, kullanıcının kimliği (ObjectId), friendId ise eklenecek/kaldırılacak arkadaşın kimliğidir. */
export const addRemoveFriend = async (req, res) => {
    try {
        /* 'id'ye sahip kullanıcı veritabanından findById metodu kullanılarak getirilir. Aynı şekilde, friendId'ye sahip arkadaş da getirilir. */
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        /*  user.friends listesi içinde friendId varsa, arkadaşın listesinden kullanıcı ve kullanıcının listesinden arkadaşın ObjectId'si çıkarılır.  */
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            /*  Eğer friendId kullanıcının listesinde yoksa, arkadaş kullanıcının listesine eklenir ve kullanıcı da arkadaşının listesine eklenir. */
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
        /* user ve friend objeleri kaydedilir ve kullanıcının arkadaşları listesi alınarak, formattedFriends adlı bir değişkene atanır. Bu listedeki arkadaşların sadece isim, soyisim, meslek, konum ve profil resmi yolu döndürülür */
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        });
        /* bu arkadaşların formatlanmış listesi, JSON formatında 200 durum kodu ile yanıt olarak gönderilir. */
        res.status(200).json(formattedFriends);
    } catch (err) {
        /* Eğer hata olursa, 404 durum kodu ile yanıt verilir ve hata mesajı da yanıtın içinde yer alır. */
        res.status(404).json({ message: err.message });
    }
};

export const updateSocialMediaLinks = async (req, res) => {
    try {
        const { id } = req.params;
        const { twitterLink, linkedinLink } = req.body;
        const user = await User.findById(id);

        if (twitterLink) {
            user.twitterLink = twitterLink;
        }
        if (linkedinLink) {
            user.linkedinLink = linkedinLink;
        }

        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query; // Arama metnini URL'den alıyoruz
        console.log("searchUsers API endpoint çalıştı, query: ", query); // bu satırı ekleyin
        const users = await User.find({
            $or: [{ firstName: { $regex: query, $options: "i" } }, { lastName: { $regex: query, $options: "i" } }],
        });
        console.log("Query: ", query);
        console.log("Users: ", users);
        res.status(200).json(users);
    } catch (err) {
        console.log("Search User Hata: ", err); // hata durumunda console.log ekleyin
        res.status(404).json({ message: err.message });
    }
};
