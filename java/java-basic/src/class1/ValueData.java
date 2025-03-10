package class1;

public class ValueData {
    int value;

    void add(){
         value++;
        System.out.println("숫자 증가 "+ value);
    }
}
// 위의 add 함수에서 static이 붙지 않은 이유
// 메서드는 객체를 생성해야 호출할 수 있다. 그런데 static이 붙으면 객체를 생성하지 않고도 메서드를 호출할 수 있다.