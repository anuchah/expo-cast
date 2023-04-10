import { StyleSheet, Text, View, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from "@react-native-material/core";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import JokeScreens from './JokeScreen';
import ProfileScreen from './ProfileScreen';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebase';

const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

try {
  firebase.initializeApp(firebaseConfig)
} catch (error) {
  console.log(error)
}

function db(path, setData) {
  const tb = ref(getDatabase(), path);
  onValue(tb, (snapshot) => {
    setData(snapshot.val());
  })
}


export default function MainScreen({ navigation }) {


  const [user, setUser] = React.useState(null);
  // const [joke, setJoke] = React.useState([]);

  useEffect(() => {
    let auth = getAuth();
    auth.onAuthStateChanged((us) => {
      setUser(us)
    })
    // db("/funnyjoke", setJoke);
  }, [])

  if (user == null) {
    return <LoginScreen />
  }


  return (
      <Tab.Navigator
        screenOptions={{ headerShown: false}}
        barStyle={{ backgroundColor: '#F7D5FF' }}
        sceneContainerStyle={{backgroundColor: '#F7D5FF'}}
      >
        <Tab.Screen
          name="Joke"
          component={JokeScreens}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='album' color={color} size={26} />
            ) ,
            title: "ตลกอีหยัง",
          }}
          
          initialParams={{ joke: jokeData }}/>

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='account' color={color} size={26} />
            ),
            title: "ข้อมูลผู้ใช้"
          }}
          initialParams={{ phoneNumber: user.phoneNumber }} />
          
      </Tab.Navigator>
  )
}


const jokeData = [
  {
      "id": 1,
      "title": "2 นายพราน",
      "content": "ผู้ชายสองคนซึ่งเป็นเพื่อนกันออกเดินทางเข้าไปในป่าเพื่อไปล่าสัตว์ด้วยกัน หลังจากเดินเข้าป่าด้วยกันไม่นานคนหนึ่งก็หมดสติล้มตัวลงไปนอนกับพื้น เพื่อนอีกคนซึ่งตกใจกับสิ่งที่เกิดขึ้นเป็นอย่างมากก็หยิบโทรศัทพ์ออกมาเพื่อโทรหา emergency services พอโทรติดเขาก็ตะโกนลงไปตามสายโทรศัพท์ว่า “ช่วยผมด้วยครับ ช่วยผมด้วย เพื่อนผมหมดสติล้มลงไป รู้สึกว่าเขาจะหยุดหายใจเเล้วด้วย ผมว่าเขาต้องตายไปเเล้วเเน่ๆ เลย ผมต้องทำยังไงดีครับ” เมื่อได้ยินดังนั้นโอเปอเรเตอร์ก็ตอบกลับไปว่า “คุณต้องใจเย็นๆ นะคะ ตั้งสติให้ดี โอเค ก่อนอื่นเลยนะคะ คุณต้องเเน่ใจเสียก่อนว่าเพื่อนของคุณตายจริง” พอโอเปอเรเตอร์พูดจบ ผู้ชายคนนั้นก็หายเงียบไป หลังจากนั้นไม่นานโอเปอเรเตอร์ก็ได้ยินเสียงปืนดังลั่นขึ้นมา สองวินาทีต่อมาผู้ชายคนเดิมก็กลับมาพูดโทรศัพท์กับเธอว่า “โอเค เรียบร้อยเเล้วครับ เเล้วยังไงต่อครับ”",
      "file": "../assets/voices/1.mp3"
  },
  {
      "id": 2,
      "title": "เยี่ยมมากดอกเตอร์วอตสัน",
      "content": "เชอร์ล็อก โฮมส์ กับดอกเตอร์วอตสัน ไปตั้งเเคมป์ด้วยกัน หลังจากทานข้าวเย็นเเละดื่มไวน์ไปขวดหนึ่งทั้งสองก็เข้านอน หลังจากทั้งสองนอนหลับไป เชอร์ล็อก โฮมส์ ก็ตื่นขึ้นพร้อมกับปลุกดอกเตอร์วอตสันที่นอนอยู่ข้างๆ ว่า “วอตสัน ถ้าคุณมองขึ้นไป คุณมองเห็นอะไร” “ผมเห็นดาวส่องประกายเป็นล้านๆ ดวง” วอตสันเเบบงัวเงียๆ“เเล้วมันบ่งบอกอะไรกับคุณบ้าง” โฮมส์ถามวอตสันใช้เวลาคิดอยู่ครู่หนึ่งก่อนตอบออกไปว่า “ถ้าดูในเชิงดาราศาสตร์เเล้วล่ะก็ ดาวพวกนี้บอกกับผมว่านอกโลกของเรานั้นยังมีกาเเล็กซี่อยู่อีกมากมายเเละอาจมีดาวที่มีลักษณะคล้ายกันกับโลกของเราอยู่อีกเป็นล้านๆ ถ้าดูในเชิงโหราศาสตร์เเล้วล่ะก็ ดาวพวกนี้บอกกับผมว่าดาวเสาร์กำลังเข้าอยู่ในระยะของราศีสิงห์ ถ้าดูในเชิงวิทยาศาสตร์ของการบอกเวลาเเล้วล่ะก็ ดาวพวกนี้บอกกับผมว่าขณะนี้เป็นเวลาประมาณตีสามกับอีกสิบห้านาที ถ้าดูในเชิงอุตุนิยมวิทยาเเล้วล่ะก็ ดาวพวกนี้บอกกับผมว่าพรุ่งนี้อากาศจะดี ถ้าดูในเชิงเทววิทยาเเล้วล่ะก็ ดาวพวกนี้บอกกับผมว่าพระเจ้ามีพลังที่มากจนเหนือคำบรรยาย เเละคุณล่ะโฮมส์ ดาวพวกนี้บอกอะไรกับคุณ” โฮมส์เงียบไปชั่วครู่ก่อนจะตอบว่า “วอตสัน ทำไมคุณโง่อย่างนี้! คุณไม่เห็นหรือไงว่ามีคนขโมยเต็นท์ของเราไป!”",
      "file": "../assets/voices/2.mp3"
  },
  {
      "id": 3,
      "title": "ความรัก",
      "content": "เพื่อนผู้ชายสองคนไปตีกอล์ฟกันที่สนามกอล์ฟเเถว ๆ บ้านของเขาทั้งสอง ในขณะที่เพื่อนคนหนึ่งกำลังจะตี เขาก็เหลือบไปเห็นขบวนงานศพเดินกันมาบนถนนข้างๆ ของสนามกอล์ฟ เมื่อเห็นดังนั้นเขาก็หยุดตีทันทีพร้อมๆ กับถอดหมวกยืนไว้อาลัยให้กับขบวนงานศพจนขบวนศพได้ผ่านเขาเเละเพื่อนของเขาไป เพื่อนของเขาเห็นดังนั้นก็เอ่ยปากชมผู้ชายคนนั้นว่า “นั่นเป็นการกระทำที่ซาบซึ้งที่สุดเท่าที่ผมเคยพบเคยเห็นมา คุณเป็นคนดีจริงๆ ” ผู้ชายคนนั้นก็ตอบกลับไปว่า “ครับ มันเป็นเพียงสิ่งเล็กน้อยมากที่ผมสามารถทำให้กับเธอได้หลังจากที่เราเเต่งงานกันมากว่าสามสิบสองปีก่อนเธอตาย”",
      "file": "../assets/voices/3.mp3"
  },
  {
      "id": 4,
      "title": "แบงค์ย่อย",
      "content": "ผู้หญิงคนหนึ่งทำกระเป๋าถือหล่นหายในห้างสรรพสินค้าโชคดีที่มีเด็กคนนึงเก็บได้ และเขาก็เอามาคืนเธอเมื่อเธอเปิดกระเป๋าออกดูหลังจากได้รับแล้ว เธอก็ต้องแปลกใจ “เอ๊ะ... ชั้นจำได้ว่ามีแบงค์ห้าร้อยในกระเป๋าอยู่ใบนึงนี่นาทำไมมันกลายเป็นแบงค์ย่อยหมดเลยล่ะ” ไอ้หนูรีบตอบอย่างรวดเร็ว “คือว่านะคับ ครั้งที่แล้วผมเก็บกระเป๋าตังค์ได้เจ้าของเค้าไม่มีแบงค์ย่อย ผมเลยอดรางวัลเลยคับ”",
      "file": "../assets/voices/4.mp3"
  },
  {
      "id": 5,
      "title": "ทำไมเธอมาเรียนสาย",
      "content": "นายเรียนดี ทำไมเธอถึงมาเรียนสายนายเรียนดีตอบกลับไปว่า มียายแก่คนนึงทำเงินหนึ่งพันหายครับครูจึงถามกลับไปว่า “ดีเลย เธอช่วยเขาหาเงินนั้นใช่มั้ย?” นายเรียนก็ตอบกลับไปว่า “เปล่าครับ ผมยืนเหยียบทับมันอยู่”",
      "file": "../assets/voices/5.mp3"
  },
  {
      "id": 6,
      "title": "เพื่อนรับวัยชรา",
      "content": "ชายแก่เพื่อนรักกัน 3 คน กำลังนั่งคุยกัน คนแรกพูดกับเพื่อนว่า เดี๋ยวนี้ความจำเริ่มแย่ หลงๆ ลืมๆ เมื่อวานปีนบันไดแล้วงงว่า กำลังปีนขึ้นหรือปีนลงกันแน่คนที่สองก็พูดเสริมว่าตัวเองก็ความจำแย่เช่นกัน เดินไปเปิดตู้เย็นแล้วลืมว่าจะเอาอะไรไปแช่ หรือหยิบอะไรออกมากินพอพูดจบทัพ้งสองคนก็หันมาถามคนที่สามว่า แล้วนายหละเป็นไงบ้างคนที่สามก็เลยตอบไปว่า ฉันกำลังนึกอยู่ว่ากำลังนั่งคุยอยู่กับใคร",
      "file": "../assets/voices/6.mp3"
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
