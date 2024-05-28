import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect } from "react";
import { useState ,useRef} from "react";
import Message from "../components/Message";

const Chatpage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  const lastMsg = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    const messagesCol = collection(db, "message");

    await addDoc(messagesCol, {
      text: e.target[0].value.trim(),
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    e.target.reset();
  };

  useEffect(() => {
    const messagesCol = collection(db, "message");

    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      console.log(snapshot);
      const tempMsg = [];
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));

      setMessages(tempMsg);

      return () => {
        unsub();
      };
    });
  }, []);

  useEffect(()=>{
lastMsg.current?.scrollIntoView({behavior:"smooth"});

  },[messages])

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.length > 0 ? (
          <>
            {messages.map((data, i) => (
              <Message data={data} key={i} />
            ))}

            <div ref={lastMsg}/>
          </>
        ) : (
          <p className="warn">
            <span> henüz hiç mesaj gönderilmedi. İlk mesajı siz gönderin</span>
          </p>
        )}
      </main>
      <form onSubmit={sendMessage}>
        <input placeholder="mesajınızı yazınız" type="text" required />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default Chatpage;
