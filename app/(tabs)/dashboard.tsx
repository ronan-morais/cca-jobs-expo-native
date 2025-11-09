import { ThemedText } from "@/components/themed-text";
import * as Contacts from "expo-contacts";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        return <ThemedText>{data.length}222</ThemedText>;
        /* if (data.length > 0) {
          data.map((contact, index) => {
            return <ThemedText key={index}>{contact.firstName}1</ThemedText>;
          });
        } */
      }
    })();
  }, []);
}
