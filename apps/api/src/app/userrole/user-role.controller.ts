import { Controller, UseGuards, Post, Request, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { RoleAssignment, STATUS_OK } from '@monorock/api-interfaces';
import { UsersService } from '../users/users.service';

@Controller('userrole')
export class UserRoleController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('assign')
  async assignRole(@Request() req) {
    Logger.log('Received request on api/userrole/assign');

    const roleAssignment: RoleAssignment = req.body;
    await this.userService.assignRoleByUserId(roleAssignment.roleName, roleAssignment.userId);
    roleAssignment.status = STATUS_OK;
    Logger.log(`assignRole::completed`);
    return roleAssignment;
  }
}
