import OwnerProfilePage from "./profile"; // your existing code
import withRoleGuard from "@/lib/roleGuard";

export default withRoleGuard(OwnerProfilePage, "owner");
