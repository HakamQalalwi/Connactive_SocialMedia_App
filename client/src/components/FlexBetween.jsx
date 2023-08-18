import { Box } from "@mui/material";
// MUI (Material-UI) adlı React UI kütüphanesinin Box bileşenini, @mui/material modülünden import eder.
import { styled } from "@mui/system";
// MUI (Material-UI) adlı React UI kütüphanesinin styled fonksiyonunu, @mui/system modülünden import eder.

const FlexBetween = styled(Box)({
  // styled fonksiyonu ile Box bileşenin özelliklerini değiştirmek için FlexBetween değişkenini tanımlar.
  display: "flex",
  // Bileşeni bir flex konteyneri olarak ayarlar.
  justifyContent: "space-between",
  // Bileşenin içindeki öğeleri, eşit aralıklarla hizalar.
  alignItems: "center",
  // Bileşenin içindeki öğeleri, dikey yönde ortalar.
});

export default FlexBetween;
// FlexBetween bileşenini, bu modülü kullanan diğer dosyalarda kullanılabilir hale getirir.
