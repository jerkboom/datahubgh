import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check API Health Status' })
  check() {
    return {
      status: 'ok',
      service: 'DataHubGH Core API',
      timestamp: new Date().toISOString(),
    };
  }
}
