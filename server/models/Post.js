import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    /* userId, firstName ve lastName alanları, kullanıcının kimlik bilgilerini içerir ve bu alanlar String türündedir. Bu alanlar ayrıca zorunlu alanlardır ve her biri required: true ile tanımlanır. */
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        /* location, description, picturePath ve userPicturePath alanları ise kullanıcının gönderisine ait diğer bilgileri içerir. Bu alanlar da String türündedir ancak zorunlu değillerdir. */
        location: String,
        description: String,
        picturePath: String,
        pdfPath: String,
        videoPath: String,
        userPicturePath: String,
        /* likes alanı bir Map türünde ve değer olarak Boolean tipinde saklanır. Bu alan, bir kullanıcının gönderisine yapılan beğenileri içerir. */
        likes: {
            type: Map,
            of: Boolean,
        },
        /* comments alanı ise bir Array tipinde saklanır ve yorumların tutulduğu bir dizi olarak kullanılır. Varsayılan olarak boş bir dizi olarak tanımlanır. */
        comments: [
            {
                userId: {
                    type: String,
                    required: true,
                },
                userPicturePath: String,
                comment: String,
            },
        ],
    },
    {
        timestamps: true,
    } /* { timestamps: true } parametresi, Mongoose tarafından oluşturulan createdAt ve updatedAt alanlarının koleksiyonda kaydedilmesini sağlar. Bu alanlar, kayıt oluşturulduğu ve son güncellemeden sonra ne zaman güncellendiğini takip etmek için kullanılır. */
);

/* mongoose.model() fonksiyonu, Post adında bir model oluşturur ve MongoDB veritabanında Post adında bir koleksiyon yaratır. Bu modeli kullanarak, veritabanına kayıt ekleyebilir, sorgular yapabilir ve güncellemeler yapabilir. */
const Post = mongoose.model("Post", postSchema);

export default Post;
