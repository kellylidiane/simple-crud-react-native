import React, { useContext } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Icon, ListItem } from "@rneui/themed";
import UsersContext from "../context/UsersContext";

export default (props) => {
  const { state, dispatch } = useContext(UsersContext);

  const confirmDeletion = (user) => {
    Alert.alert("Excluir usuário", `Deseja excluir o usuário ${user.name}?`, [
      {
        text: "Sim",
        onPress() {
          dispatch({
            type: "deleteUser",
            payload: user,
          });
        },
      },
      { text: "Não" },
    ]);
  };

  const getActions = (user) => (
    <>
      <Button
        onPress={() => props.navigation.navigate("UserForm", user)}
        type="clear"
        icon={<Icon name="edit" size={25} color="orange" />}
      />
      <Button
        onPress={() => confirmDeletion(user)}
        type="clear"
        icon={<Icon name="delete" size={25} color="red" />}
      />
    </>
  );

  const getUserItem = ({ item: user }) => {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate("UserForm", user)}
      >
        <Avatar rounded source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right style={{ flexDirection: "row" }}>
          {getActions(user)}
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
