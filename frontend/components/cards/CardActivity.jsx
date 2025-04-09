import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CardActivity = ({ title, description, image }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>

        <TouchableOpacity
          //onPress={handleFavoritePress}
          style={styles.iconContainer}
        >
          <Icon
            //name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            //color={isFavorite ? "red" : "#333"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardActivity;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  iconContainer: {
    padding: 8,
  },
});
