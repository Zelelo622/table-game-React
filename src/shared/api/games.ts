import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "src/firebase-config";
import { IGameData } from "src/shared/types/types";

// Получение всех игр
export const fetchAllGames = async (): Promise<IGameData[]> => {
  const querySnapshot = await getDocs(collection(db, "games"));
  const games: IGameData[] = [];
  querySnapshot.forEach((doc) => {
    games.push({ id: doc.id, ...doc.data() } as IGameData);
  });
  return games;
};

// Получение детальной информации об игре по id
export const fetchGameById = async (id: string): Promise<IGameData | null> => {
  const docRef = doc(db, "games", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() } as IGameData;
};
