import { Box } from "@mui/material";
// MUI (Material-UI) adlı React UI kütüphanesinin Box bileşenini, @mui/material modülünden import eder.

// Kullanıcının profil resmini göstermek için 
const UserImage = ({ image, size = "60px" }) => {
  // UserImage bileşeni bir resin URL'si ve boyutunu varsayılan 60 pixel alır
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        // objectFit resmin kutusuna tam olarak sığması için resmin boyutunu ölçeklendirir
        // borderRadius resmin yuvarlatılmış kenarlarını oluşturur
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
// UserImage bileşenini, bu modülü kullanan diğer dosyalarda kullanılabilir hale getirir.