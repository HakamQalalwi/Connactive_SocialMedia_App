import mongoose from "mongoose";

/* UserSchema şeması, kullanıcının adı, soyadı, e-posta adresi, şifre, profil resmi, arkadaşları, konumu, mesleği, görüntülenme sayısı ve etkileşim sayısını içeren alanları tanımlar. */
const UserSchema = new mongoose.Schema(
    {
        /* firstName ve lastName alanları, kullanıcının adını ve soyadını içerir. Her iki alan da String türündedir, zorunlu alanlardır ve 2 ile 50 karakter arasında olmalıdır. */
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        /* email alanı, kullanıcının e-posta adresini içerir. Bu alan zorunlu bir alandır ve benzersiz bir şekilde tanımlanmıştır. String türündedir ve en fazla 50 karakter alabilir. */
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        /* password alanı, kullanıcının hesabına erişmek için kullanacağı şifreyi içerir. Bu alan zorunlu bir alandır ve en az 5 karakterden oluşur. */
        password: {
            type: String,
            required: true,
            min: 5,
        },
        /* picturePath alanı, kullanıcının profil resmini tutar. Varsayılan olarak boş bir String olarak tanımlanmıştır. */
        picturePath: {
            type: String,
            default: "",
        },
        /* friends alanı, kullanıcının arkadaşlarını saklar. Bu alan bir Array olarak tanımlanmıştır ve varsayılan olarak boş bir dizi olarak atanmıştır. */
        friends: {
            type: Array,
            default: [],
        },
        /* location ve occupation alanları, kullanıcının konumunu ve mesleğini içerir. Her iki alan da String türündedir. */
        location: String,
        occupation: String,
        /* viewedProfile ve impressions alanları, kullanıcının profilinin kaç kez görüntülendiğini ve kaç kez etkileşime girdiğini tutar. Bu alanlar Number türündedir. */
        viewedProfile: Number,
        impressions: Number,
        twitterLink: {
            type: String,
        },
        linkedinLink: {
            type: String,
        },
    },
    /* { timestamps: true } parametresi, Mongoose tarafından oluşturulan createdAt ve updatedAt alanlarının koleksiyonda kaydedilmesini sağlar. Bu alanlar, kayıt oluşturulduğu ve son güncellemeden sonra ne zaman güncellendiğini takip etmek için kullanılır. */
    { timestamps: true }
);

/* mongoose.model() fonksiyonu, User adında bir model oluşturur ve MongoDB veritabanında User adında bir koleksiyon yaratır. Bu modeli kullanarak, veritabanına kayıt ekleyebilir, sorgular yapabilir ve güncellemeler yapabilir */
const User = mongoose.model("User", UserSchema);
export default User;
