package construct;

public class MethodInitMain1 {
    public static void main(String[] args) {
        MemberInit member1 = new MemberInit();
        member1.name = "user1";
        member1.age= 15;
        member1.grade = 90;

        MemberInit member2 = new MemberInit();
        member2.name = "user2";
        member2.age = 16;
        member2.grade = 80;

        MemberInit[] members = {member1, member2};

        for (MemberInit member:members){
            System.out.println("이름 "+member.name);
            System.out.println("나이 "+member.age);
            System.out.println("점수 "+member.grade);
        }
    }
}
// 회원 객체를 생성하고 나면 name, age, grade 같은 변수에 초기값을 설정해줘야 한다.
// 위의 코드에서는 회원을 초기값을 설정하는 부분이 반복된다.
// 메서드를 사용해서 반복을 제거해보자 (MethodInitMain2)
