import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles';
import { UserRole } from 'src/common/types/userRole';

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) {}

    
    @ApiOperation({ summary: 'Public faylni olish (static fayl)' })
    @Get('public/:name')
    getPublicFile(@Param('name') name: string) {
        return this.fileService.getPublicFile(name);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.STUDENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Private dars faylini olish (lesson-file)' })
    @Get('private/lesson-file/:lessonId/:name')
    getPrivateLessonFile(@Param('lessonId') lessonId: string, @Param('name') name: string) {
        return this.fileService.getPrivateLessonFile(lessonId, name);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.STUDENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Private video faylni olish (HLS format)' })
    @Get('private/video/:lessonId/:hlsf')
    getPrivateVideoFile(@Param('lessonId') lessonId: string, @Param('hlsf') hlsf: string) {
        return this.fileService.getPrivateVideoFile(lessonId, hlsf);
    }
}
