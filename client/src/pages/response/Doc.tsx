import { FC } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { ServiceRequestResponseType } from "../../types/service-response.type";
import axios from "axios";

interface MyDoCType {
  data: ServiceRequestResponseType;
  response_title?: string;
}

export const MyDoc: FC<MyDoCType> = ({ data, response_title }) => {
  const getBase64FromUrl = async (url: string) => {
    let image = await axios.get(url, { responseType: "arraybuffer" });
    let raw = Buffer.from(image.data).toString("base64");
    return "data:" + image.headers["content-type"] + ";base64," + raw;
  };

  const styles = StyleSheet.create({
    page: {
      // flexDirection: "row",
      padding: 40,
      backgroundColor: "#FBFBFD",
    },
    section: {
      backgroundColor: "#ffffff",
      margin: 10,
      padding: 40,
      borderRadius: "10px",
    },

    title: {
      fontFamily: "SpoqaHanSans3",
      fontSize: 20,
      paddingLeft: 20,
      // marginBottom: 5,
    },

    header: {
      fontFamily: "SpoqaHanSans1",
      fontSize: 10,
      color: "#636366",
      marginBottom: 10,
    },

    subtitle: {
      fontFamily: "SpoqaHanSans2",
      fontSize: 16,
    },

    notes: {
      fontFamily: "SpoqaHanSans1",
      fontSize: 12,
      marginTop: 10,
    },
    image: {
      borderRadius: "5px",
    },
  });

  Font.register({
    family: "SpoqaHanSans1",
    fontWeight: 300,
    src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf",
  });

  Font.register({
    family: "SpoqaHanSans2",
    fontWeight: 400,
    src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansRegular.ttf",
  });

  Font.register({
    family: "SpoqaHanSans3",
    fontWeight: 700,
    src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansBold.ttf",
  });
  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        <Text style={styles.title}>{response_title}</Text>
        {data.response.paragraph.map((value, index) => {
          let baseURL = "";
          if (value.medeia) {
            getBase64FromUrl(value.medeia).then((a) => {
              console.log(a);
            });
          }
          return (
            <View style={styles.section} key={index}>
              <Text style={styles.subtitle}>{value.subtitle}</Text>
              {value.header !== undefined ? (
                <Text style={styles.header}>{value.header}</Text>
              ) : (
                <></>
              )}
              {value.media !== undefined ? <Image src={value.media} /> : <></>}
              {value.medeia !== undefined ? (
                <Image src={value.medeia} />
              ) : (
                <></>
              )}
              <Text style={styles.notes}>{value.notes}</Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};
