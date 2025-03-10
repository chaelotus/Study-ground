package class1;

public class ClassStart3 {
    public static void main(String[] args) {
        Student student1; // Stuent 타입을 받을 수 있는 변수를 선언.
        student1 = new Student(); // 객체 생성
        student1.name = "학생1";
        student1.age = 15;
        student1.grade = 90;

        Student student2;
        student2 = new Student();
        student2.name = "학생2";
        student2.age = 16;
        student2.grade = 80;

        System.out.println("이름:"+student1.name+" 나이:"+student1.age+" 성적:"+student1.grade);
        System.out.println("이름:"+student2.name+" 나이:"+student2.age+" 성적:"+student2.grade);
    }
}

// 설계도가 클래스
// 설계도인 클래스를 이용해 실제 메모리에 만들어진 실체를 객체 또는 인스턴스라 한다.
// 위의 코드에서는 student1, student2가 객체 또는 인스턴스가 되겠다.