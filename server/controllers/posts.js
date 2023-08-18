import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        /* bir kullanıcının bir gönderi oluşturduğu işlevi içerir. İlk olarak, gerekli bilgileri (kullanıcı kimliği, açıklama ve resim yolu) alır ve kullanıcının kimliğine dayalı olarak veritabanından kullanıcı bilgilerini alır. */
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        /* kullanıcının girdiği bilgileri kullanarak yeni bir gönderi nesnesi oluşturur ve veritabanına kaydeder.  */
        await newPost.save();

        const post = await Post.find();
        /* Tüm gönderileri alır ve yanıt olarak gönderir */
        res.status(201).json(post);
    } catch (err) {
        /* Eğer bir hata olursa, 409 hatası ve bir hata mesajı döndürülür. */
        res.status(409).json({ message: err.message });
    }
};

export const createPdfPost = async (req, res) => {
    try {
        /* bir kullanıcının bir gönderi oluşturduğu işlevi içerir. İlk olarak, gerekli bilgileri (kullanıcı kimliği, açıklama ve resim yolu) alır ve kullanıcının kimliğine dayalı olarak veritabanından kullanıcı bilgilerini alır. */
        const { userId, description, pdfPath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            pdfPath,
            likes: {},
            comments: [],
        });
        /* kullanıcının girdiği bilgileri kullanarak yeni bir gönderi nesnesi oluşturur ve veritabanına kaydeder.  */
        await newPost.save();

        const post = await Post.find();
        /* Tüm gönderileri alır ve yanıt olarak gönderir */
        res.status(201).json(post);
    } catch (err) {
        /* Eğer bir hata olursa, 409 hatası ve bir hata mesajı döndürülür. */
        res.status(409).json({ message: err.message });
    }
};

export const createVideoPost = async (req, res) => {
    try {
        /* bir kullanıcının bir gönderi oluşturduğu işlevi içerir. İlk olarak, gerekli bilgileri (kullanıcı kimliği, açıklama ve resim yolu) alır ve kullanıcının kimliğine dayalı olarak veritabanından kullanıcı bilgilerini alır. */
        const { userId, description, videoPath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            videoPath,
            likes: {},
            comments: [],
        });
        /* kullanıcının girdiği bilgileri kullanarak yeni bir gönderi nesnesi oluşturur ve veritabanına kaydeder.  */
        await newPost.save();

        const post = await Post.find();
        /* Tüm gönderileri alır ve yanıt olarak gönderir */
        res.status(201).json(post);
    } catch (err) {
        /* Eğer bir hata olursa, 409 hatası ve bir hata mesajı döndürülür. */
        res.status(409).json({ message: err.message });
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        /*  MongoDB veritabanında kaydedilmiş tüm postları getirir ve bu postları JSON formatında bir HTTP yanıtı olarak döndürür. */
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        /* Eğer bir hata oluşursa, bir 404 HTTP hatası yanıtı ve hatanın mesajı döndürülür. */
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        /* Verilen kullanıcının paylaştığı tüm gönderileri getirmek için kullanılır. İstekten gelen parametreler arasında kullanıcının kimliği (id) bulunur. Bu id kullanılarak, bu kullanıcının tüm gönderileri veritabanından bulunur ve JSON formatında yanıt olarak döndürülür. */
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        /* Herhangi bir hata durumunda ise, 404 durum kodu ve bir hata mesajı döndürülür. */
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        /* bir kullanıcının bir gönderiyi beğenmesini veya beğenisini geri almasını işleme alır. id parametresi, beğenilen gönderinin kimliği olarak alınırken, userId kullanıcının kimliğini içeren istek gövdesinden alınır.  */
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        /* Belirtilen kimliğe sahip gönderipost.likes haritası kullanılır. Eğer beğenmiş ise, likes haritasından kullanıcının kimliği silinir ve aksi takdirde beğenisi true olarak ayarlanır */
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        /*  Güncellenmiş gönderi findByIdAndUpdate kullanılarak kaydedilir ve istemciye gönderilir.  */
        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });

        res.status(200).json(updatedPost);
    } catch (err) {
        /*  Hata durumunda, uygun bir HTTP yanıtı döndürülür. */
        res.status(404).json({ message: err.message });
    }
};

// post.js controller file
export const addComment = async (req, res) => {
    try {
        const { id } = req.params; // post's id
        const { comment, userId } = req.body; // comment text and user's id

        // Fetch the post
        const post = await Post.findById(id);

        // Fetch the user
        const user = await User.findById(userId);

        // Create a new comment object
        const newComment = {
            userId,
            userPicturePath: user.picturePath,
            comment,
            // You may need to add other details as per your comment schema
        };

        // Add the new comment to the comments array of the post
        post.comments.push(newComment);

        // Save the updated post
        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
