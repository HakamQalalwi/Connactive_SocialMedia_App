import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// @mui/icons-material paketinde yer alan iki MUI (Material-UI) ikon bileşenini import eder.
// PersonAddOutlined bileşeni, kişi ekleme işlemi için bir simge içerir. Bu bileşen, varsayılan olarak belirli bir boyutta ve simge renginde gösterilir.
// PersonRemoveOutlined bileşeni, kişi silme işlemi için bir simge içerir. Bu bileşen de varsayılan olarak belirli bir boyutta ve simge renginde gösterilir.

import { Box, IconButton, Typography, useTheme } from "@mui/material";
// MUI (Material-UI) paketinden Box, IconButton, Typography ve useTheme bileşenlerini import eder.
// Box bileşeni, kutu şeklindeki bir bileşendir ve içeriğini düzenlemek için kullanılır.
// IconButton bileşeni, bir simge veya simge dizisi içerir ve kullanıcının etkileşimde bulunabilmesi için tıklanabilir bir bileşen sağlar.
// Typography bileşeni, bir metin içeren bileşendir. Metin, boyut, renk, yazı tipi vb. gibi birçok stil özelliğiyle özelleştirilebilir.
// useTheme kancası, bir MUI teması alır ve bileşen içinde erişilebilir hale getirir.
// comment

import { useDispatch, useSelector } from "react-redux";
// react-redux paketinden useDispatch ve  IconuseSelectorButtone bileşenlerini import eder.
// useDispatch kancası, Redux eylemlerini tetiklemek için kullanılır.
// useSelector kancası, Redux mağazasındaki belirli bir parça durumunu almak için kullanılır. 

import { useNavigate } from "react-router-dom";
// React Router kütüphanesindeki useNavigate fonksiyonunu kullanarak bir navigation hook'u oluşturur.
// useNavigate, React Router v6'da kullanılan bir hook'tur ve programatik olarak bir sayfadan diğerine geçmek için kullanılır. 

import { setFriends } from "state";
// state paketinden setFriends fonksiyonunu import eder.
// Bu fonksiyon, olası bir uygulama durumu için arkadaş listesini güncellemek için kullanılır.

import FlexBetween from "./FlexBetween";
// Yarattığımız FlexBetween modülünü içeri aktarır.

import UserImage from "./UserImage";
// Yarattığımız UserImage modülünü içeri aktarır.

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  // useDispatch hook'u, Redux store'da tanımlanan bir fonksiyona erişmek için kullanılır. Bu fonksiyon, Redux store'daki bir uygulama durumunu güncelleyen eylemleri tetiklemek için kullanılır.
  const navigate = useNavigate();
  // useNavigate hook'u, bileşenin yönlendirme işlevselliğini kullanmasına olanak tanır. Bu hook, React Router kütüphanesiyle birlikte kullanılır ve özellikle SPA (Tek Sayfa Uygulamaları) için kullanışlıdır.
  const { _id } = useSelector((state) => state.user);
  // Redux store'da depolanan user nesnesine erişilir ve _id özelliği ayrıştırılır. Böylece, kullanıcının kimliği alınmış olur.
  const token = useSelector((state) => state.token);
  // state.token özelliği kullanılarak, Redux store'da depolanan kullanıcı oturum açma belirteci (token) alınır.
  const friends = useSelector((state) => state.user.friends);
  // state.user.friends özelliği kullanılarak, Redux store'da depolanan kullanıcının arkadaşlarından oluşan bir dizi alınır.

  const { palette } = useTheme();
  // useTheme() hook'u, Material-UI temasına erişmek için kullanılır ve bu kodda MUI temasındaki palette özelliği erişilir.
  const primaryLight = palette.primary.light;
  // palette.primary.light özelliği, MUI temasındaki birincil rengin açık tonunu temsil eder.
  const primaryDark = palette.primary.dark;
  // palette.primary.dark, MUI temasındaki birincil rengin koyu tonunu temsil eder.
  const main = palette.neutral.main;
  // palette.neutral.main, MUI temasındaki nötr ana rengi temsil eder.
  const medium = palette.neutral.medium;
  // palette.neutral.medium, MUI temasındaki nötr renkler arasındaki orta tonlu rengi temsil eder.

  const isFriend = friends.find((friend) => friend._id === friendId);
  // friends dizisi içinde, verilen friendId ile eşleşen bir nesnenin olup olmadığını kontrol eder.

  const patchFriend = async () => {
    // patchFriend adlı fonksiyon, bir async fonksiyonu olarak tanımlanır.
    const response = await fetch(
      // await anahtar kelimesi kullanılarak HTTP isteği tamamlanıncaya kadar bekletilir. fetch() fonksiyonu, belirtilen URL'ye bir HTTP isteği gönderir.
      `http://localhost:3001/users/${_id}/${friendId}`,
      // İlk parametre olarak URL verilir.
      {
        method: "PATCH",
        // method özelliği PATCH olarak ayarlanmıştır, yani bir güncelleme işlemi yapılacak demektir.
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // headers özelliği, isteğe eklenecek HTTP başlıklarını belirtir. Authorization başlığı kullanılarak token verisi gönderilir. Content-Type başlığı ise istek gövdesinin türünü belirtir. İstek gövdesi bir JSON nesnesi olduğu için bu özellik application/json olarak ayarlanır.
      }
    );
    const data = await response.json();
    // HTTP isteği tamamlandıktan sonra, response.json() yöntemi kullanılarak yanıtın JSON verileri çözülür ve data adlı değişkene atanır.
    dispatch(setFriends({ friends: data }));
    // Üstte oluşturdğumuz data verisi  setFriends fonksiyonuna gönderilir ve redux store'daki arkadaşlar dizisi güncellenir.
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            // Tıklama işlemi, onClick özelliği kullanılarak ele alınır. navigate fonksiyonu kullanılarak yürütülür.
            navigate(`/profile/${friendId}`);
            navigate(0);
            // İlk olarak  /profile/${friendId} adresine yönlendirilir ve daha sonra navigate(0) ile sayfa yenilenir.
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            // Renk, tür ve yazı kalınlığı belirlenir.
            sx={{
              // sx özelliği, bileşenin stiline özel bir CSS eklemek için kullanılır. 
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
                // Fare imleci üzerindeyken metnin rengini ve imleç stilini değiştirir. 
              },
            }}
          >
            {name} 
          </Typography>
    
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        // onClick özelliği, düğmeye tıklanınca tetiklenen bir fonksiyon belirler.
        // sx özelliği, düğmenin stilini özelleştirmek için kullanılır.
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        ) 
        //isFriend değişkeni, arkadaş listesindeki arkadaşların kimliklerinin bir dizisini içerir. Eğer şu anki arkadaş listesi bu kişiyi içeriyorsa, isFriend değeri true olur.
        // Düğmenin içeriği, isFriend değerine bağlı olarak değişir. Eğer arkadaş zaten eklenmişse, düğme arkadaşı çıkarmak için bir simgeye sahip olur. Aksi takdirde, arkadaş ekleme simgesi görünür.
      } 
      </IconButton>
    </FlexBetween>
    // Bu kod arkadaş ekleme / çıkarma işlemi için bir button oluşturur.
  );
};

export default Friend;
// // Friend bileşenini, bu modülü kullanan diğer dosyalarda kullanılabilir hale getirir.





