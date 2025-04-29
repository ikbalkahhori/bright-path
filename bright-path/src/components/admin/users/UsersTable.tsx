import {
    Mail,
    Calendar,
    Clock,
    Globe
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { formatDate, getInitialsFromName } from "@/lib/utils";

export default function UsersTable({ users }: { users: User[] }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Interests</TableHead>
                        <TableHead>Preferred Destination</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Applications</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                        <AvatarImage src={user.photoURL} alt={user.displayName} />
                                        <AvatarFallback className="bg-purple-100 text-purple-700">
                                            {getInitialsFromName(user.displayName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div>{user.displayName}</div>
                                        {user.lastLogin && (
                                            <div className="text-xs text-gray-500 flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                Last login: {formatDate(user.lastLogin)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-sm">
                                    <Mail className="h-4 w-4 mr-1 text-gray-400" />
                                    {user.email}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={
                                    user.role === "admin"
                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                        : "bg-blue-50 text-blue-700 border-blue-200"
                                }>
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {user.interests && user.interests.length > 0 ? (
                                        user.interests.slice(0, 2).map((interest, idx) => (
                                            <Badge key={idx} variant="outline" className="bg-gray-50">
                                                {interest}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-xs">No interests</span>
                                    )}
                                    {user.interests && user.interests.length > 2 && (
                                        <Badge variant="outline" className="bg-gray-50">
                                            +{user.interests.length - 2}
                                        </Badge>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                {user.preferredDestination ? (
                                    <div className="flex items-center">
                                        <Globe className="h-4 w-4 mr-1 text-gray-400" />
                                        <span>{user.preferredDestination}</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-400 text-xs">Not specified</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                    {formatDate(user.createdAt)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge className={
                                    user.applicationCount && user.applicationCount > 0
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                }>
                                    {user.applicationCount || 0}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}