package construct;

public class MemberThis {

    String nameField;

    void memberInit(String nameParameter){
        nameField = nameParameter;
    }
}
// 이런 경우에는 앞에 this가 생략되어있다고 보면 된다.