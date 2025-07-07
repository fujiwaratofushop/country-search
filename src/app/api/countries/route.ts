import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { CountryModel } from '@/app/models/Country';

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const name = searchParams.get('name')?.trim() || '';
  const continent = searchParams.get('continent')?.trim() || '';
  const sort = searchParams.get('sort')?.trim().toLowerCase() || '';

  const filter: any = {};
  if (name) filter.name = { $regex: name, $options: 'i' };
  if (continent) filter.continent = continent;

  const skip = (page - 1) * limit;

  const usePagination = true;

  const query = CountryModel.find(filter).select('name capital flag continent currency');

  // Sort logic
  if (sort) {
    switch (sort) {
      case 'country':
        query.sort({ name: 1 });
        break;
      case 'currency':
        query.sort({ currency: 1 });
        break;
      case 'continent':
        query.sort({ continent: 1 });
        break;
      default:
        break;
    }
  }

  if (usePagination) {
    query.skip(skip).limit(limit);
  }

  const countries = await query.lean();

  return NextResponse.json(countries);
}
