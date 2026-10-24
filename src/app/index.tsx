import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  mkCompleteData,
  mkRealmsData,
  mkStagesData,
  type Character,
  type Realm,
  type Stage,
} from "../constants/data/mkCompleteData";

type Tab = "lore" | "roster" | "realms" | "stages" | "secrets" | "rate";

interface RegisteredUser {
  name: string;
  email: string;
  pass: string;
}

const initialUsers: RegisteredUser[] = [
  { name: "Admin MK", email: "admin@mk.com", pass: "123456" },
];

const tabs: { id: Tab; label: string }[] = [
  { id: "lore", label: "Historia" },
  { id: "roster", label: "Luchadores" },
  { id: "realms", label: "Reinos" },
  { id: "stages", label: "Escenarios" },
  { id: "secrets", label: "Secretos" },
  { id: "rate", label: "Calificar" },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [currentUser, setCurrentUser] = useState("");
  const [registeredUsers, setRegisteredUsers] =
    useState<RegisteredUser[]>(initialUsers);

  const [regName, setRegName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [activeTab, setActiveTab] = useState<Tab>("lore");
  const [search, setSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] =
    useState<Character | null>(null);
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  const [rating, setRating] = useState(5);
  const [favoriteGame, setFavoriteGame] = useState("Mortal Kombat II");

  const handleLogin = () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Alert.alert("Campos incompletos", "Ingresa tu correo y contraseña.");
      return;
    }

    const user = registeredUsers.find(
      (item: RegisteredUser) =>
        item.email.toLowerCase() === cleanEmail &&
        item.pass === password
    );

    if (!user) {
      Alert.alert(
        "Acceso denegado",
        "Correo o contraseña incorrectos. Usa admin@mk.com con contraseña 123456 para probar."
      );
      return;
    }

    setCurrentUser(user.name);
    setIsLoggedIn(true);
    setEmail("");
    setPassword("");
  };

  const handleRegister = () => {
    const name = regName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!name || !cleanEmail || !password) {
      Alert.alert("Campos incompletos", "Completa todos los campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      Alert.alert("Correo inválido", "Escribe un correo válido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña corta", "Usa al menos 6 caracteres.");
      return;
    }

    if (
      registeredUsers.some(
        (user: RegisteredUser) => user.email === cleanEmail
      )
    ) {
      Alert.alert("Correo existente", "Ese correo ya está registrado.");
      return;
    }

    setRegisteredUsers((previous) => [
      ...previous,
      { name, email: cleanEmail, pass: password },
    ]);

    Alert.alert(
      "Registro exitoso",
      `Bienvenido al torneo, ${name}. Ya puedes iniciar sesión.`,
      [
        {
          text: "Continuar",
          onPress: () => {
            setAuthMode("login");
            setRegName("");
            setEmail(cleanEmail);
            setPassword("");
          },
        },
      ]
    );
  };

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    setSearch("");
    setSelectedCharacter(null);
    setSelectedRealm(null);
    setSelectedStage(null);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAuthMode("login");
    setCurrentUser("");
    setPassword("");
    setEmail("");
    setSelectedCharacter(null);
    setSelectedRealm(null);
    setSelectedStage(null);
  };

  const filteredCharacters = mkCompleteData.filter(
    (character: Character) =>
      `${character.name} ${character.origin}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())
  );

  const filteredRealms = mkRealmsData.filter(
    (realm: Realm) =>
      `${realm.name} ${realm.ruler}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())
  );

  const filteredStages = mkStagesData.filter(
    (stage: Stage) =>
      stage.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const renderCharacter = (character: Character) => (
    <TouchableOpacity
      key={character.id}
      style={[
        styles.itemCard,
        character.type !== "fighter" && styles.specialCard,
      ]}
      onPress={() => setSelectedCharacter(character)}
      activeOpacity={0.8}
    >
      <Image source={character.image} style={styles.avatar} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{character.name}</Text>
        <Text style={styles.itemSubtitle}>{character.origin}</Text>
        <Text style={styles.itemLink}>Ver ficha completa →</Text>
      </View>
      <Text style={styles.typeBadge}>
        {character.type === "fighter"
          ? "LUCHADOR"
          : character.type === "boss"
            ? "JEFE"
            : "SECRETO"}
      </Text>
    </TouchableOpacity>
  );

  const renderRealm = (realm: Realm) => (
    <TouchableOpacity
      key={realm.id}
      style={styles.itemCard}
      onPress={() => setSelectedRealm(realm)}
      activeOpacity={0.8}
    >
      <View style={styles.realmIcon}>
        <Text style={styles.realmIconText}>🌎</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{realm.name}</Text>
        <Text style={styles.itemSubtitle}>{realm.ruler}</Text>
        <Text style={styles.itemLink}>Ver descripción →</Text>
      </View>
    </TouchableOpacity>
  );

  const renderStage = (stage: Stage) => (
    <TouchableOpacity
      key={stage.id}
      style={styles.itemCard}
      onPress={() => setSelectedStage(stage)}
      activeOpacity={0.8}
    >
      <Image source={stage.image} style={styles.stageThumb} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{stage.name}</Text>
        <Text style={styles.itemSubtitle}>
          {stage.hasStageFatality
            ? "Fatality de escenario"
            : "Arena de combate"}
        </Text>
        <Text style={styles.itemLink}>Ver escenario →</Text>
      </View>
    </TouchableOpacity>
  );

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#09090b" />
        <ScrollView
          contentContainerStyle={styles.authScroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.authCard}>
            <Text style={styles.logo}>MK II</Text>
            <Text style={styles.authTitle}>MORTAL KOMBAT</Text>
            <Text style={styles.authSubtitle}>ENCYCLOPEDIA</Text>

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>
              {authMode === "login"
                ? "Portal de acceso"
                : "Registro de guerrero"}
            </Text>

            {authMode === "register" && (
              <TextInput
                style={styles.input}
                placeholder="Nombre de guerrero"
                placeholderTextColor="#a1a1aa"
                value={regName}
                onChangeText={setRegName}
                autoCapitalize="words"
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#a1a1aa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#a1a1aa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={authMode === "login" ? handleLogin : handleRegister}
            >
              <Text style={styles.primaryButtonText}>
                {authMode === "login" ? "Entrar al torneo" : "Crear cuenta"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => {
                setAuthMode(authMode === "login" ? "register" : "login");
                setRegName("");
                setEmail("");
                setPassword("");
              }}
            >
              <Text style={styles.switchText}>
                {authMode === "login"
                  ? "¿No tienes cuenta? Regístrate"
                  : "¿Ya tienes cuenta? Inicia sesión"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.smallNote}>
              Cuenta inicial: admin@mk.com · Contraseña: 123456. Las cuentas
              registradas son temporales y se borran al reiniciar la aplicación.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#18181b" />

      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>MKII ENCYCLOPEDIA</Text>
          <Text style={styles.userSubtitle}>Guerrero: {currentUser}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navBar}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.navButton,
                activeTab === tab.id && styles.activeTab,
              ]}
              onPress={() => changeTab(tab.id)}
            >
              <Text
                style={[
                  styles.navText,
                  activeTab === tab.id && styles.activeNavText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        keyboardShouldPersistTaps="handled"
      >
        {activeTab === "lore" && (
          <View style={styles.section}>
            <Text style={styles.heroIcon}>🐉</Text>
            <Text style={styles.sectionTitle}>El torneo de Outworld</Text>
            <Text style={styles.paragraph}>
              Tras la derrota de Shang Tsung en el primer torneo, Shao Kahn
              propone un nuevo enfrentamiento en Outworld. Los campeones de
              la Tierra deben sobrevivir a un torneo peligroso para impedir
              que el emperador conquiste su reino.
            </Text>
            <Text style={styles.paragraph}>
              Explora las fichas de los luchadores, descubre los reinos y
              recorre las arenas de Mortal Kombat II.
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => changeTab("roster")}
            >
              <Text style={styles.primaryButtonText}>Explorar luchadores</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "roster" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plantel de luchadores</Text>
            <Text style={styles.paragraph}>
              Personajes oficiales, jefes y combatientes secretos.
            </Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar luchador..."
              placeholderTextColor="#a1a1aa"
              value={search}
              onChangeText={setSearch}
            />
            {filteredCharacters
              .filter((character: Character) => character.type === "fighter")
              .map(renderCharacter)}

            <Text style={styles.subheading}>Jefes</Text>
            {filteredCharacters
              .filter((character: Character) => character.type === "boss")
              .map(renderCharacter)}
          </View>
        )}

        {activeTab === "realms" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Los reinos del cosmos</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar reino..."
              placeholderTextColor="#a1a1aa"
              value={search}
              onChangeText={setSearch}
            />
            {filteredRealms.map(renderRealm)}
          </View>
        )}

        {activeTab === "stages" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Escenarios de combate</Text>
            <Text style={styles.paragraph}>
              Explora las diez arenas registradas en esta enciclopedia.
            </Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar escenario..."
              placeholderTextColor="#a1a1aa"
              value={search}
              onChangeText={setSearch}
            />
            {filteredStages.map(renderStage)}
          </View>
        )}

        {activeTab === "secrets" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Secretos y curiosidades</Text>
            <Text style={styles.paragraph}>
              Algunos personajes aparecen mediante condiciones especiales
              o encuentros ocultos que pueden variar según la edición.
            </Text>
            {filteredCharacters
              .filter((character: Character) => character.type === "secret")
              .map(renderCharacter)}

            <View style={styles.infoPanel}>
              <Text style={styles.subheading}>¡Toasty!</Text>
              <Text style={styles.paragraph}>
                El mensaje Toasty! se convirtió en uno de los detalles más
                reconocibles de la serie. Está asociado al diseñador de
                sonido Dan Forden y aparece en determinadas situaciones
                durante los combates.
              </Text>
            </View>
          </View>
        )}

        {activeTab === "rate" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Califica la enciclopedia</Text>
            <Text style={styles.paragraph}>
              Selecciona de una a cinco estrellas y escribe tu juego de lucha
              favorito.
            </Text>

            <Text style={styles.label}>Tu calificación</Text>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((number) => (
                <TouchableOpacity
                  key={number}
                  style={[
                    styles.starButton,
                    rating === number && styles.activeStar,
                  ]}
                  onPress={() => setRating(number)}
                >
                  <Text style={styles.starText}>
                    {number <= rating ? "★" : "☆"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Juego favorito</Text>
            <TextInput
              style={styles.input}
              value={favoriteGame}
              onChangeText={setFavoriteGame}
              placeholder="Escribe tu juego favorito"
              placeholderTextColor="#a1a1aa"
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() =>
                Alert.alert(
                  "¡Gracias!",
                  `Calificación: ${rating}/5\nJuego favorito: ${
                    favoriteGame.trim() || "No indicado"
                  }`
                )
              }
            >
              <Text style={styles.primaryButtonText}>Enviar calificación</Text>
            </TouchableOpacity>

            <Text style={styles.smallNote}>
              Esta versión muestra la confirmación, pero no guarda la
              calificación en un servidor.
            </Text>
          </View>
        )}

        {(selectedCharacter || selectedRealm || selectedStage) && (
          <View style={styles.detailCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setSelectedCharacter(null);
                setSelectedRealm(null);
                setSelectedStage(null);
              }}
            >
              <Text style={styles.closeButtonText}>✕ Cerrar ficha</Text>
            </TouchableOpacity>

            {selectedCharacter && (
              <>
                <Image
                  source={selectedCharacter.image}
                  style={styles.detailImage}
                  resizeMode="contain"
                />
                <Text style={styles.detailTitle}>
                  {selectedCharacter.name}
                </Text>
                <Text style={styles.detailLine}>
                  Origen: {selectedCharacter.origin}
                </Text>
                <Text style={styles.detailLine}>
                  Alineación: {selectedCharacter.alignment}
                </Text>
                <Text style={styles.detailLine}>
                  Categoría: {selectedCharacter.type}
                </Text>
                <Text style={styles.subheading}>Biografía</Text>
                <Text style={styles.paragraph}>{selectedCharacter.bio}</Text>
                <Text style={styles.subheading}>Poderes</Text>
                {selectedCharacter.powers.map(
                  (power: string, index: number) => (
                    <Text key={`${index}-${power}`} style={styles.detailLine}>
                      • {power}
                    </Text>
                  )
                )}
                <Text style={styles.subheading}>Arma</Text>
                <Text style={styles.paragraph}>{selectedCharacter.weapon}</Text>
                <Text style={styles.subheading}>Fatality</Text>
                <Text style={styles.paragraph}>
                  {selectedCharacter.fatality}
                </Text>
                <Text style={styles.subheading}>Babality</Text>
                <Text style={styles.paragraph}>
                  {selectedCharacter.babality}
                </Text>
                <Text style={styles.subheading}>Friendship</Text>
                <Text style={styles.paragraph}>
                  {selectedCharacter.friendship}
                </Text>
              </>
            )}

            {selectedRealm && (
              <>
                <Text style={styles.detailTitle}>{selectedRealm.name}</Text>
                <Text style={styles.subheading}>Gobernante</Text>
                <Text style={styles.paragraph}>{selectedRealm.ruler}</Text>
                <Text style={styles.subheading}>Descripción</Text>
                <Text style={styles.paragraph}>
                  {selectedRealm.description}
                </Text>
              </>
            )}

            {selectedStage && (
              <>
                <Image
                  source={selectedStage.image}
                  style={styles.detailImage}
                  resizeMode="contain"
                />
                <Text style={styles.detailTitle}>{selectedStage.name}</Text>
                <Text style={styles.subheading}>Descripción</Text>
                <Text style={styles.paragraph}>
                  {selectedStage.description}
                </Text>
                <Text style={styles.detailLine}>
                  Fatality de escenario:{" "}
                  {selectedStage.hasStageFatality ? "Sí" : "No"}
                </Text>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  authScroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  authCard: {
    backgroundColor: "#18181b",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#dc2626",
  },
  logo: {
    color: "#eab308",
    fontSize: 54,
    fontWeight: "900",
    textAlign: "center",
  },
  authTitle: {
    fontSize: 23,
    fontWeight: "900",
    color: "#ef4444",
    textAlign: "center",
    letterSpacing: 2,
  },
  authSubtitle: {
    fontSize: 12,
    color: "#a1a1aa",
    textAlign: "center",
    letterSpacing: 4,
    marginTop: 7,
    marginBottom: 22,
  },
  separator: {
    height: 1,
    backgroundColor: "#3f3f46",
    marginBottom: 22,
  },
  input: {
    backgroundColor: "#27272a",
    color: "#fff",
    padding: 13,
    borderRadius: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#3f3f46",
  },
  primaryButton: {
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  switchButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  switchText: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  smallNote: {
    color: "#a1a1aa",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#18181b",
    borderBottomWidth: 1,
    borderColor: "#27272a",
  },
  headerInfo: {
    flex: 1,
    paddingRight: 10,
  },
  headerTitle: {
    color: "#ef4444",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
  },
  userSubtitle: {
    color: "#a1a1aa",
    fontSize: 11,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#27272a",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 6,
  },
  logoutText: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "bold",
  },
  navContainer: {
    backgroundColor: "#18181b",
    borderBottomWidth: 1,
    borderColor: "#27272a",
  },
  navBar: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  navButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  activeTab: {
    backgroundColor: "#dc2626",
  },
  navText: {
    color: "#a1a1aa",
    fontSize: 12,
    fontWeight: "600",
  },
  activeNavText: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 16,
    paddingBottom: 35,
  },
  section: {
    marginBottom: 20,
  },
  heroIcon: {
    fontSize: 58,
    textAlign: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#ef4444",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },
  subheading: {
    color: "#eab308",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 17,
    marginBottom: 8,
  },
  paragraph: {
    color: "#d4d4d8",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: "#27272a",
    color: "#fff",
    padding: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3f3f46",
    marginBottom: 14,
  },
  itemCard: {
    backgroundColor: "#18181b",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#3f3f46",
  },
  specialCard: {
    borderColor: "#eab308",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 10,
    backgroundColor: "#27272a",
  },
  stageThumb: {
    width: 75,
    height: 55,
    borderRadius: 6,
    backgroundColor: "#27272a",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  itemSubtitle: {
    color: "#a1a1aa",
    fontSize: 11,
    marginTop: 4,
  },
  itemLink: {
    color: "#f87171",
    fontSize: 11,
    marginTop: 6,
  },
  typeBadge: {
    color: "#eab308",
    fontSize: 8,
    fontWeight: "bold",
    marginLeft: 5,
  },
  realmIcon: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#27272a",
    justifyContent: "center",
    alignItems: "center",
  },
  realmIconText: {
    fontSize: 27,
  },
  infoPanel: {
    backgroundColor: "#18181b",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#3f3f46",
    marginTop: 15,
  },
  label: {
    color: "#d4d4d8",
    fontSize: 14,
    marginTop: 15,
    marginBottom: 9,
  },
  ratingRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  starButton: {
    backgroundColor: "#27272a",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 7,
    marginRight: 7,
    marginBottom: 7,
  },
  activeStar: {
    backgroundColor: "#a16207",
  },
  starText: {
    color: "#fff",
    fontSize: 22,
  },
  detailCard: {
    backgroundColor: "#18181b",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#dc2626",
    marginTop: 18,
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#27272a",
    borderRadius: 6,
    marginBottom: 14,
  },
  closeButtonText: {
    color: "#f87171",
    fontWeight: "bold",
  },
  detailImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#09090b",
    borderRadius: 10,
    marginBottom: 15,
  },
  detailTitle: {
    color: "#ef4444",
    fontSize: 23,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  detailLine: {
    color: "#d4d4d8",
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 6,
  },
});
