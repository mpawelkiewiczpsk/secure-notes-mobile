import { View } from "react-native";
import { axiosInstance } from "../../api/axiosInstance";
import { List } from "react-native-paper";
import { useEffect, useState } from "react";
import { save, getValueFor } from "../../utils";

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (isChanged) {
      getValueFor("notes").then((data) => {
        setNotes(JSON.parse(data));
      });

      setIsChanged(false);
    }
  }, [isChanged]);

  useEffect(() => {
    axiosInstance
      .get("/notesssr")
      .then(({ data }) => {
        save("notes", JSON.stringify(data)).then(() => {
          setIsChanged(true);
        });
      })
      .catch((error) => {
        setIsChanged(true);
        console.log(error);
      });
  }, []);

  return (
    <View>
      <List.Section title="Notes">
        {notes.map((note) => (
          <List.Item key={note.id} title={note.content} />
        ))}
      </List.Section>
    </View>
  );
};

export default HomeScreen;
