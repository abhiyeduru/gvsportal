import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, UserRoundPen, Building2 } from "lucide-react";
import Container from "../../common/Container";
import PersonalInfo from "./PersonalInfo";
import ProfessionalDetails from "./ProfessionalDetails";
import InstitutionProfile from "../../EmployerComponents/InstitutionProfile";
import ParentProfile from "./ParentProfile";
import TeacherProfile from "./TeacherProfile";
import SubscriptionPlans from "../Subscription";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const isSchool = user?.role === "school";
  const isParent = user?.role === "parent";
  const isTeacher = user?.role === "teacher" || user?.role === "jobSeeker";

  return (
    <Tabs
      defaultValue="personal-details"
      className="px-1 lg:px-4 mx-auto w-full h-full max-h-[calc(100vh-19vh)]"
    >
      <TabsList className="flex flex-wrap h-fit">
        <TabsTrigger
          className="flex text-background gap-2"
          value="personal-details"
        >
          <UserRoundPen size={20} />
          <span className="">Personal Information</span>
        </TabsTrigger>

        {isSchool ? (
          <TabsTrigger
            className="flex text-background gap-2"
            value="institution-profile"
          >
            <Building2 size={20} />
            Institution Profile
          </TabsTrigger>
        ) : isParent ? (
          <TabsTrigger
            className="flex text-background gap-2"
            value="parent-profile"
          >
            <UserRoundPen size={20} />
            Parent Details
          </TabsTrigger>
        ) : (
          <>
            {isTeacher && (
              <TabsTrigger
                className="flex text-background gap-2"
                value="teacher-profile"
              >
                <BookOpen size={20} />
                Teacher Details
              </TabsTrigger>
            )}
            <TabsTrigger
              className="flex text-background gap-2"
              value="professional-details"
            >
              <BookOpen size={20} />
              Professional Details
            </TabsTrigger>
          </>
        )}
        {!isParent && (
          <TabsTrigger className="flex text-background gap-2" value="subscription">
            <span className="">Billing & Plans</span>
          </TabsTrigger>
        )}
      </TabsList>
      <Container
        className={`max-w-screen-2xl overflow-auto capitalize font-semibold w-full px-2 lg:px-6 lg:mx-2 max-h-full min-h-full bg-background lg:py-12`}
      >
        <TabsContent value="personal-details">
          <PersonalInfo />
        </TabsContent>
        {isSchool ? (
          <TabsContent value="institution-profile">
            <InstitutionProfile />
          </TabsContent>
        ) : isParent ? (
          <TabsContent value="parent-profile">
            <ParentProfile />
          </TabsContent>
        ) : (
          <>
            {isTeacher && (
              <TabsContent value="teacher-profile">
                <TeacherProfile />
              </TabsContent>
            )}
            <TabsContent value="professional-details">
              <ProfessionalDetails />
            </TabsContent>
          </>
        )}
        {!isParent && (
          <TabsContent value="subscription">
            <SubscriptionPlans />
          </TabsContent>
        )}
      </Container>
    </Tabs>
  );
};

export default Profile;
