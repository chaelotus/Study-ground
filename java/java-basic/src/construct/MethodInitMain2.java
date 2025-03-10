package construct;

public class MethodInitMain2 {
    public static void main(String[] args) {
        MemberInit member1 = new MemberInit();
        initMember(member1,"user1",16,20);

        MemberInit member2 = new MemberInit();
        initMember(member2,"user2",16,80);

        MemberInit[] members = {member1, member2};

        for (MemberInit member:members){
            System.out.println("이름 "+member.name);
            System.out.println("나이 "+member.age);
            System.out.println("점수 "+member.grade);
        }
    }

    static void initMember(MemberInit member, String name, int age, int grade){
        member.name = name;
        member.age = age;
        member.grade = grade;

    }
}
// 위의 함수로 반복을 제거했다. 하지만 이 메서드는 대부분 Member 객체의 멤버변수를 사용한다.
// 쉽게 이야기해서 Member가 자기 자신의 데이터를 변경하는 기능(메서드)을 제공하는 것이 좋다.
