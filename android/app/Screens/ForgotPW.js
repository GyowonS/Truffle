import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet, 
} from 'react-native';
import Eye from "../assets/icons/Eye";
import { authService } from '../app/firebaseConfig';
function ForgotPW({navigation}) {

  {/*const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/118x66"); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    if (isClicked) {
      setImageSrc("https://via.placeholder.com/118x66");
        setIsClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
      } else {
        setImageSrc("https://via.placeholder.com/118x66");
        setIsClicked(true); // true일 땐 변경될 이미지 src
      }
  }; */}
  
  
    {/* 타이머 */}
      const initialTime = 540;
      const [remainingTime, setRemainingTime] = useState(initialTime);
      const [isTimerRunning, setIsTimerRunning] = useState(false);
      const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);
      const [isStopButtonDisabled, setIsStopButtonDisabled] = useState(true);
      const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(true);
  
      useEffect(() => {
          let timer;
  
          if (isTimerRunning && remainingTime > 0) {
              timer = setInterval(() => {
                  setRemainingTime((prevTime) => prevTime - 1);
              }, 1000);
          }
  
          return () => clearInterval(timer);
  
      }, [isTimerRunning, remainingTime]);
  
      const formatTime = (timeInSeconds) => {
          const minutes = Math.floor(timeInSeconds / 60);
          const seconds = timeInSeconds % 60;
          return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };
  
      const handleStartTimer = () => {
          setIsTimerRunning(true);
          setIsStartButtonDisabled(true);
          setIsStopButtonDisabled(false);
          setIsResendButtonDisabled(false);
      };
  
      const handleStopTimer = () => {
          setIsTimerRunning(false);
          setIsStopButtonDisabled(true);
          setIsResendButtonDisabled(true);
          
      };
  
      const handleResetTimer = () => {
          setRemainingTime(initialTime);
          setIsTimerRunning(true);
          setIsStartButtonDisabled(true);
          setIsStopButtonDisabled(false);
          
      };
  
    {/*조건문 useState */}
    const [email, setEmail] = useState('');
    const [text, onChangeText] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordContent, setPasswordContent] = useState('');
    const [passwordContent1, setPasswordContent1] = useState('');
  
    const reg = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  
    const pwCondition = (password) => {
      return reg.test(password);
    };
  
    const handlePasswordChange = (value) => {
      setPassword(value);
  
      if (value && !pwCondition(value)) {
        setPasswordContent1('8-15자 이내의 영문, 숫자, 특수문자를 조합해주세요.');
      } else {
        setPasswordContent1('');
      }
    };
  
    const handlePassword2Change = (value) => {
      setPassword2(value);
  
      if (password !== value) {
        setPasswordContent('비밀번호가 일치하지 않습니다');
      } else {
        setPasswordContent('');
      }
    };
  
    const isPassword = (value1, value2) => {
      return value1 === value2;
    };
  
    const handleFormSubmit = async () => {
      try {
        if (!isPassword(password, password2) || !pwCondition(password)) {
          alert('모든 항목을 제대로 입력해주십시오');
          return;
        }
        const user = await authService.confirmPasswordReset(email, verificationCode);
        await user.updatePassword(password);
  
        alert('비밀번호가 성공적으로 변경되었습니다.');
        navigation.navigate('SuccessPW');
      } catch (error) {
        console.error('비밀번호 변경 오류:', error);
        alert('비밀번호 변경 중 오류가 발생했습니다.');
      }
    };

  return(
      <View style={styles.container}>
        <View style={{flexDirection:'row',gap:60}}>
        <TouchableOpacity
          style={{marginLeft:30}}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backBTN}> ⟨ </Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>비밀번호 재설정</Text>
      </View>

        <TextInput
          style={styles.inputP}
          onChangeText={(value) => setEmail(value)}
          value={text}
          placeholder="이메일"
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={[styles.midButton, {backgroundColor: isStartButtonDisabled ? '#CCCCCC' : '#FEA655'} ]}
          onPress={handleStartTimer} 
                  disabled={isStartButtonDisabled}> 
          <Text style={styles.buttonText}>인증번호 발송</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.resend}
          onPress={handleResetTimer}
          disabled={isResendButtonDisabled} >
          <Text style={styles.saveTxt}>인증번호 재발송</Text>
        </TouchableOpacity>
      <View style={{flexDirection:'row'}}>
        <TextInput
          style={styles.inputRe}   
          placeholder="인증번호"
          keyboardType="numeric"
        />
        {/* 타이머 */}
        <Text style={{ color: 'purple', position: 'absolute', top: 90, paddingLeft: 80}}>{formatTime(remainingTime)}</Text>
      </View>
  
        <TouchableOpacity
          style={[styles.smallButton, {backgroundColor: isStopButtonDisabled ? '#CCCCCC' : '#FEA655'} ]}
          onPress={handleStopTimer} 
          disabled={isStopButtonDisabled}   
          >
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>

    <TouchableOpacity style={{top: 98}}>
      <Eye/>
     </TouchableOpacity>   
        <TextInput
          style={styles.inputP}
          setPassword={setPassword}
          value={password}
          placeholder="비밀번호"
          keyboardType="email"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Text style={styles.passwordContent}>{passwordContent1}</Text>
      <TouchableOpacity style={{top: 98}}>
      {/*<Image src={imageSrc} onClick={handleClick}/>*/}
      <Eye/>
     </TouchableOpacity>   
        <TextInput
          style={styles.inputP}
          placeholder="비밀번호 확인"
          keyboardType="email"
          secureTextEntry={true}
            value={password2}
            onChangeText={handlePassword2Change}
        />
        <Text style={styles.passwordContent}>{passwordContent}</Text>
  
        <TouchableOpacity
          style={styles.buttonP}
          onPress={handleFormSubmit}>
          <Text style={styles.buttonText} type="submit">비밀번호 변경</Text>
        </TouchableOpacity>
       
      </View>
    );
  } 

  const styles = StyleSheet.create({
    inputP: {
      fontSize: 15,
      borderBottomWidth: 0.5,
      height: 40,
      width: 232,
      top: 80,
      marginBottom: 20,
      color: '#878787',
    },
    buttonP: {
      top: 100,
      backgroundColor: '#FEA655',
      paddingVertical: 10,
      paddingHorizontal: 48,
      borderRadius: 25,
    },
    midButton: {
      right: 48,
      top: 64,
      backgroundColor: '#FEA655',
      paddingVertical: 10,
      paddingHorizontal: 23,
      borderRadius: 25,
    },
    resend: {
      top: 33,
      left: 75,
    },
    inputRe: {
      fontSize: 15,
      borderBottomWidth: 0.5,
      height: 40,
      width: 160,
      top: 82,
      right: 35,
      marginBottom: 10,
      color: '#878787',
    },
    smallButton: {
      left: 85,
      top: 36,
      backgroundColor: '#FEA655',
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 25,
    },
    passwordContent: {
      top: 50,
      fontSize: 12,
      color: '#ff0000',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F8F9FA', // 배경색상 추가
    },
    topTitle: {
      fontSize: 24,
      top: 12,
      marginLeft:-100
    },
    input: {
      fontSize: 15,
      borderWidth: 0.5,
      height: 28,
      width: 232,
      marginBottom: 30,
      color: '#878787',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth:0,
    },
    save: {
      flexDirection: 'row', 
      justifyContent: 'space-evenly',
      bottom: 15,
      right: 45,
    },
    saveTxt: {
      fontSize: 12,
      color: '#757575',
    },
    signUp: {
      top: 105,
      right: 100,
      paddingHorizontal: 100,
    },
    reset: {
      top: 90,
      left: 100,
      paddingHorizontal: 100,
    },
  
    button: {
      top: 85,
      backgroundColor: '#FEA655',
      paddingVertical: 10,
      paddingHorizontal: 48,
      borderRadius: 25,
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: 'NanumGothic',
    },
    backBTN: {
      fontSize: 25,
      marginLeft:-140,
      marginTop:11,
    },
  })
  
  export default ForgotPW;