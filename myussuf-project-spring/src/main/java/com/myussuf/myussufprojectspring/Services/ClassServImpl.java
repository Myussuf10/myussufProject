package com.myussuf.myussufprojectspring.Services;

import com.myussuf.myussufprojectspring.Entities.Class;
import com.myussuf.myussufprojectspring.Entities.Subject;
import com.myussuf.myussufprojectspring.Repository.ClassRepo;
import lombok.AllArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.DateFormatter;
import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.SimpleFormatter;

@Service
@Transactional
@AllArgsConstructor
public class ClassServImpl implements ClassServ{
    private final static  DateTimeFormatter formatter =
            DateTimeFormatter.ofPattern("dd MMM yyyy");
    private ClassRepo classRepo;
    private @Lazy SubjectServImpl subjectServ;

    @Override
    public Class getClassDetails(int id) {
        return classRepo.getClassById(id);
    }

    public Class findClassById(int id){return classRepo.findById(id).get();}

    @Override
    public List<Class> getClassBySubject(int SubjectId) {
        List<Class> x = new ArrayList<>();
        classRepo.findAll().forEach(lesson->x.add(lesson));
        return x;
    }
    @Override
    public Class setUpClass(Class clas, int subjectId) throws ParseException {
        Subject y = subjectServ.getSubject(subjectId);
        clas.setSubject(y);
        return classRepo.save(clas);
    }

    @Override
    public List<Class> findClassesBySubjectId(int subjectid){
        return classRepo.findClassesBySubjectId(subjectid);
    }

    @Override
    public Class saveClass(Class lesson){
        return classRepo.save(lesson);
    }
}
