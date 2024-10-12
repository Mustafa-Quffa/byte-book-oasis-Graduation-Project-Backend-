import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard'; // Ensure RolesGuard is correctly implemented
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
// @UseGuards(JwtAuthGuard, RolesGuard) // Protect routes with both JWT and role guards
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Get statistics for the dashboard
  @Get('dashboard')
  @Roles('admin') // Only allow admin role
  getDashboardData() {
    return this.adminService.getDashboardData(); // Fetches total users, books, etc.
  }

  // Get all users for user management
  @Get('user')
  @Roles('admin') // Only allow admin role
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // Get all books for book management
  @Get('book')
  @Roles('admin') // Only allow admin role
  getAllBooks() {
    return this.adminService.getAllBooks();
  }

  // Get all borrowing records
  // @Get('borrow-records')
  // @Roles('admin') // Only allow admin role
  // getAllBorrowRecords() {
  //   return this.adminService.getAllBorrowRecords();
  // }

  // Get reports, could be for book loans, user activities, etc.
  // @Get('reports')
  // @Roles('admin') // Only allow admin role
  // getReports() {
  //   return this.adminService.getReports();
  // }
}
