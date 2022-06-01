import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  title: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.black,
    marginBottom: 20,
  },
  icon: {
    fontSize: 24,
    padding: 5
  },
  input: {
    padding: 10,
    alignItems: "center",
    fontSize: 20
  }
})

export default styles;