package class1;

public class ValueDataMain {
    public static void main(String[] args) {
        ValueData valueData = new ValueData();
        add(valueData);
        add(valueData);
        add(valueData);
    }

    static void add(ValueData valueData){
        valueData.value++;
        System.out.println(valueData.value);
    }
}

// 자바와 같은 객체지향 언어는 클래스 내부의 속성(데이터)과 기능(메서드)을 함께 포함할 수 있다.
